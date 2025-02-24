import { useMutation, useQuery } from "@tanstack/react-query";
import { createComments, deleteComments, getComments } from "../../api/api";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Comments } from "../../utils/types";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

interface CommentProps {
    postID: string;
}

const Comment = ({ postID }: CommentProps) => {
    const { user } = useAuthContext()

    const userID = user?._id;
    const [comment, setComment] = useState("");

    const { data: comments, isLoading, refetch } = useQuery({
        queryKey: ["comments", postID],
        queryFn: () => getComments(postID),
    });

    console.log(comments);

    const commentMutation = useMutation({
        mutationFn: createComments,
        onSuccess: () => {
            setComment("");
            refetch();
        },
        onError: (error: any) => {
            console.log(error);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteComments,
        onSuccess: () => {
            refetch()
        },
        onError: (error: any) => {
            console.log(error);
        }
    })

    return (
        <div>
            {/* Comment List with Adaptive Min Height and Scrolling */}
            <div className="lg:max-h-[450px] max-h-[100px] min-h-[100px] lg:min-h-[450px] overflow-y-auto rounded-md p-2 px-3">
                {isLoading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : (
                    comments?.map((comment: Comments) => (
                        <div key={comment._id} className="p-2">
                            <Link to={`/profile/${comment.user._id}`} className="flex items-center gap-2 w-full">
                                <img
                                    src={comment?.user?.image?.[0] || ""}
                                    alt="User"
                                    className="w-8 h-8 rounded-full border border-gray-300"
                                />
                                <div className="w-full">
                                    <Link to={`/profile/${comment.user._id}`} className="text-sm font-semibold">{comment?.user?.username || "Unknown"}</Link>
                                    <div className="flex items-center justify-between w-full">
                                        <p className="text-sm max-w-[400px] w-full">{comment.comment}</p>
                                        {comment.user._id === userID ? <button onClick={() => deleteMutation.mutate(comment._id)}><MdDelete /></button> : null}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                )}
            </div>

            {/* Comment Input */}
            <div className="flex px-3 gap-1 py-1">
                <textarea
                    className="w-full border border-gray-300 rounded-md resize-none focus:outline-none px-5 py-2 h-10 bg-background"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className="bg-primary px-5 rounded-md font-bold text-white"
                    onClick={() => commentMutation.mutate({ post: postID, comment })}
                    disabled={!comment.trim()} // Prevent empty comments
                >
                    Post
                </button>
            </div>
        </div>
    );
};

export default Comment;
