import { useMutation, useQuery } from "@tanstack/react-query";
import { getPostLikes, toggleLikes } from "../api/api";
import useNotificationMutation from "./useNotifications";
import { queryClient } from "../main";
import { useAuthContext } from "../context/AuthContext";



export const useToggleLikeMutation = (postID: string) => {
    const {user}= useAuthContext();
    const userID = user?._id    ;
    const { mutate: notificationMutation } = useNotificationMutation();

    // Using 'any' to bypass strict typing for mutate
    const { mutate: likeMutation }: any = useMutation({
        mutationFn: async (likes: { userID: string, postID: string }) => await toggleLikes(likes),
        onSuccess: async (data) => {
            console.log(data);
            queryClient.invalidateQueries(['likes', postID]);

            const populatedLike = await data?.populatedLike;

            if(populatedLike){
                const recipient: string = populatedLike?.post?.user;
                const type: "like" | "comment" | "follow" = "like";
                const post: string  = data?.populatedLike?.post?._id;
                const notification = { recipient, type, post };
    
                if (recipient === userID) {
                   return;
                } else {
                    notificationMutation(notification);
                    
                }
            }
        },
        onError: (error) => {
            console.log(error);
        },
    });

    return { likeMutation };
};
export const useLikesByPosts = (postID: string) => {

    const { data, isLoading, refetch } = useQuery(
        ['likes', postID], // use postID to differentiate queries
        async () => await getPostLikes(postID),
        {
            enabled: !!postID, // Ensures the query only runs when postID is truthy
        }

    );

    return { data, isLoading, refetch };
};
