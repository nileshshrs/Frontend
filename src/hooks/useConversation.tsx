import { useQuery, useQueryClient } from "@tanstack/react-query";
import { conversation } from "../utils/types";
import { getConversation } from "../api/api";
import { useAuthContext } from "../context/AuthContext";


export const useConversations = () => {
    const { data: conversations, refetch, error, isLoading } = useQuery<conversation[]>({
        queryKey: ['conversations'],
        queryFn: getConversation,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: false,
        onError: (error: any) => {
            console.error('Failed to fetch conversations', error);
        },
    });

    return { conversations, refetch, error, isLoading };
};


export const useConversationByUser = () => {
    const { user } = useAuthContext();
    const queryClient = useQueryClient();

    if (!user) {
        console.error("User is not authenticated");
        return { conversation: null, recipientId: null, recipientName: null };
    }

    // Access the cached conversations
    const cachedConversations = queryClient.getQueryData<conversation[]>(['conversations']);

    // Find the conversation involving the current user
    const conversation = cachedConversations?.find(
        (conv) =>
            conv.participants &&
            conv.participants.some((participant) => participant._id === user._id)
    );

    // Determine the recipient's ID and name
    const recipientId =
        conversation?.participants &&
            conversation?.participants.length === 2 &&
            user
            ? user._id === conversation?.participants[0]._id
                ? conversation?.participants[1]._id
                : conversation?.participants[0]._id
            : null;

    const recipientName =
        user._id === conversation?.participants[0]._id
            ? conversation?.participants[1].username
            : conversation?.participants[0].username;

    return { conversation, recipientId, recipientName };
};