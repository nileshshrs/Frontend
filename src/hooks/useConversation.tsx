import { useQuery } from "@tanstack/react-query";
import { conversation } from "../utils/types";
import { getConversation, getConversationByID } from "../api/api";
import { useAuthContext } from "../context/AuthContext";


export const useConversations = () => {
    const { user } = useAuthContext();

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

    // Count unread conversations
    const messageUnreadCount = conversations
        ? conversations.filter((conv) => conv.read === user?._id).length
        : 0;

    return { conversations, refetch, error, isLoading, messageUnreadCount };
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


    const recipientId =
        user && conversation?.participants?.length === 2
            ? user._id === conversation.participants[0]._id
                ? conversation.participants[1]._id
                : conversation.participants[0]._id
            : null;

    // console.log(recipientId)

    const recipientName =
        user && conversation?.participants?.length === 2
            ? user._id === conversation.participants[0]._id
                ? conversation.participants[1]?.username || "Unknown"
                : conversation.participants[0]?.username || "Unknown"
            : null;

    const recipientImage =
        user && conversation?.participants?.length === 2
            ? user._id === conversation.participants[0]._id
                ? conversation.participants[1]?.image[0] || null // Assuming the image field exists
                : conversation.participants[0]?.image[0] || null
            : null;

    return { conversation, recipientId, recipientName, isLoading, error, recipientImage };
};