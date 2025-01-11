import { Follows } from "../../utils/types";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { deleteFollow } from "../../api/api";
import { useLocation } from "react-router-dom"; // Import useLocation

interface followersProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    followers: Follows[];
    refetchFollowers: () => void;
}

const Followers = ({ open, onOpenChange, followers, refetchFollowers }: followersProps) => {
    const { mutate: removeFollower } = useMutation(deleteFollow, {
        onSuccess: () => {
            // Refetch followers after successful deletion
            refetchFollowers();
        },
        onError: (error: any) => {
            console.error("Error deleting follower:", error);
        },
    });

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
                                                        className="w-[45px] h-[45px] rounded-full"
                                                        src={follow?.follower?.image || "https://avatars.pfptown.com/020/anime-girl-pfp-995.png"}
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
                                            {follow?.match ? (
                                                <Button
                                                    onClick={() => removeFollower(follow._id)}
                                                    variant={"ghost"}
                                                    className="bg-muted"
                                                >
                                                    Following
                                                </Button>
                                            ) : isProfilePage ? (
                                                <Button
                                                    onClick={() => removeFollower(follow._id)}
                                                    variant={"ghost"}
                                                    className="bg-muted"
                                                >
                                                    Follow
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() => removeFollower(follow._id)}
                                                    variant={"ghost"}
                                                    className="bg-muted"
                                                >
                                                    Remove
                                                </Button>
                                            )}
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

export default Followers;
