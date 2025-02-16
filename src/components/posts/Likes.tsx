import { useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useLikesByPosts, useToggleLikeMutation } from '../../hooks/useLikes';
import { FaRegComment, FaHeart, FaRegHeart } from "react-icons/fa";

interface LikeProps {
    postID: string,
    setLikesLoading: (isLoading: boolean) => void;
    isOpen: boolean;
    setIsOpen: (isLoading: boolean) => void;
}

const Likes = ({ postID, setLikesLoading, isOpen, setIsOpen }: LikeProps) => {
    const { user } = useAuthContext();
    const userID = user?._id;
    const { data, refetch, isLoading } = useLikesByPosts(postID);
    const { likeMutation } = useToggleLikeMutation(postID);

    // Log to debug
    console.log(data);

    // Set loading state whenever isLoading changes
    useEffect(() => {
        setLikesLoading(isLoading);
    }, [isLoading]);

    // Function to toggle like/unlike
    const handleLikeClick = () => {
        if (userID && postID) {
            likeMutation({ userID, postID });
        }
        refetch()
    };

    return (
        <>
            <div className="flex gap-5">
                <button className="flex items-center" onClick={handleLikeClick}>
                    {
                        // Change the icon depending on whether the user liked the post
                        data?.userLiked === true
                            ? <FaHeart className="text-2xl text-red-500" />// Filled heart if liked
                            : <FaRegHeart className="text-2xl text-gray-500" />  // Empty heart if not liked
                    }
                </button>
                <button className="flex items-center" onClick={() => setIsOpen(!isOpen)}>
                    <FaRegComment className="text-2xl" />
                </button>
            </div>
            <div className="font-bold">
                {data?.likeCount} Likes
            </div>
        </>
    );
};

export default Likes;
