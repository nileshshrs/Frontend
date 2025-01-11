import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Connections } from "../utils/types";
import { followUser, getConnection, getFollowers, getFollowings } from "../api/api";


export const useConnections = () => {
    const { data: connections, refetch, error, isLoading } = useQuery<Connections[]>({
        queryKey: ['connections'],
        queryFn: getConnection,
        onError: (error: any) => {
            console.log("failed to fetch connections", error)
        }
    })

    return { connections, refetch, error, isLoading }
}

export const useFollowings = (id: string | undefined) => {
    const { data, refetch: refetchFollowing, isLoading } = useQuery({
        queryKey: ['followings', id],
        queryFn: async () => await getFollowings(id),
        onError: (error: any) => {
            console.log(error);
        },
        enabled: !!id
    });

    // Safely return `following` or an empty array if `data` is undefined
    const following = data || [];

    return { following, refetchFollowing, isFollowingLoading: isLoading };
};


export const useFollowers = (id: string | undefined) => {
    const { data, refetch: refetchFollowers, isLoading } = useQuery({
        queryKey: ['followers', id],
        queryFn: async () => getFollowers(id),
        onError: (error: any) => {
            console.log(error);
        },
        enabled: !!id
    })

    const followers = data || [];

    return { followers, refetchFollowers, isFollowersLoading: isLoading }
}

export const useFollowUser = () => {


  

};