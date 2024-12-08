import { useQuery, useQueryClient } from "@tanstack/react-query";
import { conversation } from "../utils/types";
import { getConversation } from "../api/api";

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


export const useConversationById = (id: string | undefined) => {
    const queryClient = useQueryClient();

    // Access the cached conversations
    const cachedConversations = queryClient.getQueryData<conversation[]>(['conversations']);

    // Filter the specific conversation by ID
    const singleConversation = cachedConversations?.find(conv => conv._id === id);

    return singleConversation;
};