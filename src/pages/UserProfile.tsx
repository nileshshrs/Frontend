import { useParams } from "react-router-dom"
import Followers from "../components/connections/Followers"
import Following from "../components/connections/Following"
import { Button } from "../components/ui/button"
import { useAuthContext } from "../context/AuthContext"
import { useState } from "react"
import { useFollowers, useFollowings, useUnfollowUser } from "../hooks/useConnections"
import { GrGrid } from "react-icons/gr"
import useFetchUserByID from "../hooks/useFetchUserByID"
import { IoCameraOutline } from "react-icons/io5"
import { Follows, posts } from "../utils/types"
import { usePostByUserID } from "../hooks/usePostsByUser"
import Loader from "../components/utils/Loader"
import { useMutation } from "@tanstack/react-query"
import { followUser } from "../api/api"
import useNotificationMutation from "../hooks/useNotifications"

const UserProfile = () => {
    const { user } = useAuthContext();
    const { id } = useParams();
    const { fetchedUser, isLoading: fetchUserIsLoading, refetch } = useFetchUserByID(id!);
    const { following, refetchFollowing, isFollowingLoading } = useFollowings(id!);
    const { followers, refetchFollowers, isFollowersLoading } = useFollowers(id!);
    const { mutate: notificationMutation } = useNotificationMutation()
    const { mutate: followMutation } = useMutation({
        mutationFn: (id: string) => followUser(id!), // Follow user API call
        onSuccess: (data) => {
            // After successfully following, invalidate the user query to refetch the data
            const recipient: string = data.follow.following; // The user who is being followed
            const type: 'like' | 'comment' | 'follow' = "follow"; // Notification type is "follow"
            const post: string | null = null;

            const notification = { recipient, type, post }; // Prepare the notification object

            // Trigger the notification mutation
            notificationMutation(notification);
            refetchFollowers();
            refetchFollowing();
            refetch();

        },
        onError: (error: any) => {
            console.log("Error following user:", error);
        },
    });
    const { mutate: unfollowMutation } = useUnfollowUser(refetchFollowers, refetchFollowing);
    const { userPosts, refetchUserPosts, isLoading } = usePostByUserID(id!)
    const [isFollowersOpen, setIsFollowersOpen] = useState(false); // State to control the dialog
    const [isFollowingOpen, setIsFollowingOpen] = useState(false); // State to control the dialog

    const isFollower = followers.some((follow: Follows) => follow.follower._id === user?._id)

    const handleFollowersToggle = () => {
        setIsFollowersOpen((prev) => !prev);
    };
    const handleFollowingToggle = () => {
        setIsFollowingOpen((prev) => !prev);
    };

    // console.log(followers, "follower")
    // console.log(following, "follwing")


    if (fetchUserIsLoading && isFollowersLoading && isFollowingLoading) return null;
    return (

        <div className='min-h-screen'>
            <div className="h-full mx-auto py-20 lg:w-[70%] grid gap-5 lg:py-10">
                <div className='px-5 flex flex-col gap-5'>
                    <div className="flex">
                        {/* Profile Picture Section */}
                        <section className="mr-5">
                            <div>
                                <img
                                    src="https://avatars.pfptown.com/020/anime-girl-pfp-995.png"
                                    alt=""
                                    className="w-[75px] h-[75px] rounded-full md:w-[150px] md:h-[150px]"
                                />
                            </div>
                        </section>

                        {/* User Info Section */}
                        <section className="ml-5 ">
                            <div className="flex flex-col gap-4 items-start">
                                {/* Username and Edit Button */}
                                <div className="flex gap-5 items-center">
                                    <div className="text-xl hidden font-semibold md:block">
                                        {fetchedUser?.username}
                                    </div>
                                    {
                                        isFollower ? <Button
                                            variant={"ghost"}
                                            className="w-[120px] bg-muted text-sm font-semibold"
                                            onClick={() =>
                                                unfollowMutation({ followerID: user?._id!, followingID: id! })
                                            }
                                        >
                                            unfollow
                                        </Button> : <Button
                                            variant={"ghost"}
                                            className="w-[120px] bg-muted text-sm font-semibold"
                                            onClick={() => followMutation(id!)}
                                        >
                                            follow
                                        </Button>
                                    }
                                </div>

                                {/* Stats (Posts, Followers, Following) */}
                                <div className="hidden gap-10 md:flex">
                                    <div><span className="font-bold">{userPosts.length}</span> posts</div>
                                    <div><button onClick={handleFollowersToggle}><span className="font-bold">{followers.length}</span> followers</button></div>
                                    <div><button onClick={handleFollowingToggle}><span className="font-bold">{following.length}</span> following</button></div>
                                </div>

                                {/* User's Full Name and Email */}
                                <div className="hidden flex-col gap-2 md:flex">
                                    <div className="">
                                        @{fetchedUser?.username}
                                    </div>
                                    <div className="text-xs bg-muted px-3 py-1 rounded-full">
                                        {fetchedUser?.email}
                                    </div>
                                </div>

                            </div>

                        </section>

                    </div>
                    <div className='flex flex-col gap-2 md:hidden'>
                        <div className="px-3 text-lg font-semibold">
                            {fetchedUser?.username}
                        </div>
                        <div className="text-xs bg-muted px-3 py-1 rounded-full w-fit">
                            {fetchedUser?.email}
                        </div>
                    </div>
                    <div className='px-3 text-sm md:px-5 md:text-xs h-[16px]'>
                        {fetchedUser?.bio}
                    </div>

                </div>
                <section className='border-t mt-5 h-full'>
                    <div className='flex justify-between items-center  border-b px-7 md:hidden'>
                        <div className="pt-2 pb-4">
                            <div className='flex flex-col items-center justify-center text-sm'>
                                <span className="font-bold">
                                    0
                                </span> posts
                            </div>
                        </div>
                        <div className="pt-2 pb-4">
                            <button onClick={handleFollowersToggle} className='flex flex-col items-center justify-center text-sm'>
                                <span className="font-bold">
                                    {followers.length}
                                </span> followers
                            </button>
                        </div>
                        <div className="pt-2 pb-4">
                            <button onClick={handleFollowingToggle} className='flex flex-col items-center justify-center text-sm'>
                                <span className="font-bold">
                                    {following.length}
                                </span> following
                            </button>
                        </div>
                    </div>
                    <div className='w-full border-b md:border-none'>
                        <div className="inline-flex items-center gap-3 p-4 text-lg min-w-[200px] justify-center border-t border-custom-border font-semibold md:w-auto md:text-base">
                            <GrGrid className='text-blue-500 md:text-inherit' /> <span className='hidden md:block'>POSTS</span>
                        </div>
                    </div>
                    {/* you fix this and show this if there are no posts from users*/}
                    <div className='h-full'>
                        {isLoading ? <Loader /> : userPosts?.length > 0 ?
                            <div className="grid grid-cols-3 gap-4">
                                {
                                    userPosts.map((posts: posts) => {
                                        return (
                                            <div key={posts._id} className="flex justify-center">
                                                <img
                                                    src={posts.image[0]}
                                                    alt=""
                                                    className="w-full h-full max-w-[300px] max-h-[300px] object-cover aspect-square"
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </div> :
                            <div className='flex flex-col items-center justify-center gap-1 p-5 h-full'>
                                <div className='rounded-full border-2 border-custom-border p-7'>
                                    <IoCameraOutline className='text-5xl' />
                                </div>
                                <div className='font-extrabold text-4xl'>
                                    Share Moments
                                </div>
                                <div className='font-light text-sm text-center'>
                                    When you share your first moments, they will appear in your profile.
                                </div>
                            </div>
                        }
                    </div>
                </section>
            </div>
            <Followers
                open={isFollowersOpen}
                onOpenChange={setIsFollowersOpen}
                followers={followers}
                refetchFollowers={refetchFollowers}
                refetchFollowing={refetchFollowing}
            />
            <Following
                open={isFollowingOpen}
                onOpenChange={setIsFollowingOpen}
                following={following}
                refetchFollowers={refetchFollowers}
                refetchFollowing={refetchFollowing}
            />

        </div>
    )
}
export default UserProfile