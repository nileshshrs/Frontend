import { useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useLikesByPosts, useToggleLikeMutation } from '../../hooks/useLikes';
import { FaRegComment, FaRegHeart } from "react-icons/fa";

interface LikeProps {
    postID: string,
    setLikesLoading: (isLoading: boolean) => void; 
}

const Likes = ({ postID, setLikesLoading }: LikeProps) => {
    const { user } = useAuthContext();
    const userID = user?._id;
    const { data,refetch, isLoading } = useLikesByPosts(postID);
    const { likeMutation } = useToggleLikeMutation(userID!, postID);

    // Set loading state whenever isLoading changes
    useEffect(() => {
        setLikesLoading(isLoading);
    }, [isLoading]);

    return (
        <>
            <div className="flex gap-5">
                <button className="flex items-center" onClick={() => {
                    if (userID && postID) {
                        likeMutation({ userID: userID, postID: postID });
                        refetch();
                    }
                }}>
                    <FaRegHeart className="text-2xl" />
                </button>
                <button className="flex items-center">
                    <FaRegComment className="text-2xl" />
                </button>
            </div>
            <div className="font-bold">
                {data?.likeCount} Likes
            </div>
        </>
    );
}

export default Likes;
