import { useMutation } from "@tanstack/react-query";
import { deleteFollow, followUser } from "../../api/api";
import { Follows } from "../../utils/types";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import { useAuthContext } from "../../context/AuthContext";
import { useUnfollowUser } from "../../hooks/useConnections";

interface followingProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    following: Follows[];
    refetchFollowers: () => void;
    refetchFollowing: () => void;
}

const Following = ({ open, onOpenChange, following, refetchFollowing, refetchFollowers }: followingProps) => {
    console.log(following)
    const { user } = useAuthContext();
    const userID = user?._id;

    const { mutate: followMutation } = useMutation({
        mutationFn: (id: string) => followUser(id!), // Follow user API call
        onSuccess: () => {
            // After successfully following, invalidate the user query to refetch the data
            refetchFollowers();
            refetchFollowing();
        },
        onError: (error: any) => {
            console.log("Error following user:", error);
        },
    });
    const { mutate: removeFollowing } = useMutation(deleteFollow, {
        onSuccess: () => {
            // Refetch following after successful deletion
            refetchFollowing();
            refetchFollowers();
        },
        onError: (error: any) => {
            console.error("Error deleting following:", error);
        },
    });
    const { mutate: unfollowMutation } = useUnfollowUser(refetchFollowers, refetchFollowing);

    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation(); // Get the current location

    // Filter the following list based on the search term
    const filteredFollowing = following.filter((follows) => {
        const username = follows?.following?.username.toLowerCase();
        const email = follows?.following?.email.toLowerCase();
        const term = searchTerm.toLowerCase();
        return username.includes(term) || email.includes(term);
    });

    // Check if the current path starts with /profile
    const isProfilePage = location.pathname.startsWith("/profile");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[400px] max-h-[450px]">
                <DialogHeader>
                    <DialogTitle className="text-center border-b pb-5">Following</DialogTitle>
                    <div className="p-3 flex flex-col gap-5">
                        {/* Filter Input */}
                        <div>
                            <Input
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        {/* Display filtered following list */}
                        <div>
                            {filteredFollowing.length > 0 ? (
                                filteredFollowing.map((follows) => {
                                    return (
                                        <div key={follows._id} className="mb-5 flex justify-between w-full items-center">
                                            <div className="flex items-center gap-5">
                                                <div>
                                                    <img
                                                        className="w-[45px] h-[45px] rounded-full"
                                                        src={follows?.following?.image || "https://avatars.pfptown.com/020/anime-girl-pfp-995.png"}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="flex flex-col items-start">
                                                    <div>{follows?.following?.username}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {follows?.following?.email}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Conditional rendering of the button based on the 'match' attribute */}
                                            {
                                                isProfilePage ? (
                                                    follows.following._id === userID ? null : (
                                                        follows.match ? (
                                                            <Button
                                                                onClick={() =>
                                                                    unfollowMutation({ followerID:userID!, followingID:follows.following._id! })
                                                                }
                                                                variant={"ghost"}
                                                                className="bg-muted"
                                                            >
                                                                Following
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                onClick={() => followMutation(follows.following._id)}
                                                                variant={"ghost"}
                                                                className="bg-muted"
                                                            >
                                                                Follow
                                                            </Button>
                                                        )
                                                    )
                                                ) : (
                                                    <Button variant={"ghost"} className="bg-muted">
                                                        Following
                                                    </Button> //todo add logic
                                                )
                                            }

                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center text-sm text-muted-foreground">
                                    No results found
                                </div>
                            )}
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default Following;
