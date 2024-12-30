import { useQuery, useQueryClient } from "@tanstack/react-query";
import { conversation } from "../utils/types";
import { getConversation, getConversationByID } from "../api/api";
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


export const useConversationByUser = (conversationId: string) => {
    const { user } = useAuthContext();

    const { data: conversation, isLoading, error } = useQuery(
        ["conversation", conversationId],
        () => getConversationByID(conversationId),
        {
            enabled: !!user && !!conversationId, // Only fetch if user and conversationId are available
            staleTime: 1000 * 60 * 5, // Optional: Cache data for 5 minutes
            retry: 1, // Retry once if the query fails
        }
    );

    console.log(conversation)

    const recipientId =
        user && conversation?.participants?.length === 2
            ? user._id === conversation.participants[0]._id
                ? conversation.participants[1]._id
                : conversation.participants[0]._id
            : null;

    console.log(recipientId)

    const recipientName =
        user && conversation?.participants?.length === 2
            ? user._id === conversation.participants[0]._id
                ? conversation.participants[1]?.username || "Unknown"
                : conversation.participants[0]?.username || "Unknown"
            : null;

    return { conversation, recipientId, recipientName, isLoading, error };
};