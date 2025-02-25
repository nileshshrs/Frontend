import { Follows } from "../../utils/types";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteFollow, followUser, unfollowUser } from "../../api/api";
import { useLocation } from "react-router-dom"; // Import useLocation
import { useAuthContext } from "../../context/AuthContext";
import { useUnfollowUser } from "../../hooks/useConnections";
import { useSocketContext } from "../../context/SocketContext";


// todo fix the follow and following button on this dialog box for the user profile page
interface followersProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    followers: Follows[];
    refetchFollowers: () => void;
    refetchFollowing: () => void;
}

const Followers = ({ open, onOpenChange, followers, refetchFollowing, refetchFollowers }: followersProps) => {
    const { user } = useAuthContext();
    const userID = user?._id;
    const {socket}  = useSocketContext()

    const { mutate: followMutation } = useMutation({
        mutationFn: (id: string) => followUser(id!), // Follow user API call
        onSuccess: (data) => {
            // After successfully following, invalidate the user query to refetch the data
            refetchFollowers();
            refetchFollowing();
            socket?.emit("notify", data.follow);
        },
        onError: (error: any) => {
            console.log("Error following user:", error);
        },
    });
    const { mutate: removeFollower } = useMutation(deleteFollow, {
        onSuccess: () => {
            // Refetch followers after successful deletion
            refetchFollowers();
            refetchFollowing();
        },
        onError: (error: any) => {
            console.error("Error deleting follower:", error);
        },
    });

    const { mutate: unfollowMutation } = useUnfollowUser(refetchFollowers, refetchFollowing);

    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation(); // Get the current location

    // Filter the followers list based on the search term
    const filteredFollowers = followers.filter((follow) => {
        const username = follow?.follower?.username.toLowerCase();
        const email = follow?.follower?.email.toLowerCase();
        const term = searchTerm.toLowerCase();
        return username.includes(term) || email.includes(term);
    });

    // Check if the current path starts with /profile
    const isProfilePage = location.pathname.startsWith("/profile");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[400px] max-h-[450px]">
                <DialogHeader>
                    <DialogTitle className="text-center border-b pb-5">Followers</DialogTitle>
                    <div className="p-3 flex flex-col gap-5">
                        {/* Filter Input */}
                        <div>
                            <Input
                                placeholder="Search by username or email"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        {/* Display filtered followers list */}
                        <div>
                            {filteredFollowers.length > 0 ? (
                                filteredFollowers.map((follow) => {
                                    return (
                                        <div key={follow._id} className="mb-5 flex justify-between w-full items-center">
                                            <div className="flex items-center gap-5">
                                                <div>
                                                    <img
                                                        className="w-[45px] h-[45px] rounded-full aspect-square"
                                                        src={follow?.following?.image || "https://avatars.pfptown.com/020/anime-girl-pfp-995.png"}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="flex flex-col items-start">
                                                    <div>{follow?.follower?.username}</div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {follow?.follower?.email}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Conditional rendering of the button based on the 'match' attribute */}
                                            {
                                                isProfilePage ? (
                                                    follow.follower._id === userID ? null : (
                                                        follow.match ? (
                                                            <Button
                                                                onClick={() =>
                                                                    unfollowMutation({ followerID: userID!, followingID: follow?.follower?._id })
                                                                }
                                                                variant={"ghost"}
                                                                className="bg-muted"
                                                            >
                                                                Following
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                onClick={() => followMutation(follow.follower._id)}
                                                                variant={"ghost"}
                                                                className="bg-muted"

                                                            >
                                                                Follow
                                                            </Button>
                                                        )
                                                    )

                                                ) : (null)
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
        </Dialog >
    );
};

export default Followers;
