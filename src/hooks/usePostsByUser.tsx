import { useQuery } from "@tanstack/react-query"
import { getPostsByUser, getPostsByUserID } from "../api/api"

export const usePostsByUser = () => {
    const { data, isLoading, error, refetch: refetchUserPosts } = useQuery({
        queryKey: ['user_posts'],
        queryFn: getPostsByUser,
        onError: (error: any) => {
            console.log(error);
        }
    })

    const userPosts = data || [];

    return { userPosts, isLoading, refetchUserPosts };
}

export const usePostByUserID = (id: string) => {
    const { data, isLoading, error, refetch: refetchUserPosts } = useQuery({
        queryKey: ['user_posts_id', id],
        queryFn: async () => getPostsByUserID(id),
        enabled: !!id,
        onError: (error: any) => {
            console.log(error);
        }
    })
    const userPosts = data || [];
    return {userPosts, isLoading, refetchUserPosts};
}

