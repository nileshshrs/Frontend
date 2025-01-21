import { useAuthContext } from '../context/AuthContext'
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { GrGrid } from "react-icons/gr";
import { IoCameraOutline } from "react-icons/io5";
import { useFollowers, useFollowings } from '../hooks/useConnections';
import { usePostsByUser } from '../hooks/usePostsByUser';
import { posts } from '../utils/types';
import Loader from '../components/utils/Loader';
import { useState } from 'react';
import Followers from '../components/connections/Followers';
import Following from '../components/connections/Following';

const Account = () => {

    const { user } = useAuthContext();
    const { following, refetchFollowing, isFollowingLoading } = useFollowings(user?._id);
    const { followers, refetchFollowers, isFollowersLoading } = useFollowers(user?._id);
    const { userPosts, isLoading } = usePostsByUser()
    const [isFollowersOpen, setIsFollowersOpen] = useState(false); // State to control the dialog
    const [isFollowingOpen, setIsFollowingOpen] = useState(false); // State to control the dialog

    const handleFollowersToggle = () => {
        setIsFollowersOpen((prev) => !prev);
    };
    const handleFollowingToggle = () => {
        setIsFollowingOpen((prev) => !prev);
    };

    if (isFollowersLoading && isFollowingLoading) return null;

    return (
        <div className='min-h-screen overflow-y-scroll'>
            <div className=" mx-auto py-20 lg:w-[70%] grid gap-5 lg:py-10">
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
                                        {user?.username}
                                    </div>
                                    <Link to="">
                                        <Button
                                            variant={"ghost"}
                                            className="w-[120px] bg-muted text-sm font-semibold"
                                        >
                                            Edit Profile
                                        </Button>
                                    </Link>
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
                                        @{user?.username}
                                    </div>
                                    <div className="text-xs bg-muted px-3 py-1 rounded-full">
                                        {user?.email}
                                    </div>
                                </div>
                            </div>

                        </section>

                    </div>
                    <div className='flex flex-col gap-2 md:hidden'>
                        <div className="px-3 text-lg font-semibold">
                            {user?.username}
                        </div>
                        <div className="text-xs bg-muted px-3 py-1 rounded-full w-fit">
                            {user?.email}
                        </div>
                    </div>
                    <div className='px-3 text-sm md:px-5 md:text-xs'>
                        write your bio here
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
                    <div className='h-full flex items-center justify-center'>
                        {isLoading ? <Loader /> : userPosts?.length > 0 ?
                            <div className="grid grid-cols-3 max-w-[900px]">
                                {
                                    userPosts.map((posts: posts) => {
                                        return (
                                            <div key={posts._id} className="flex justify-center border max-w-[300px] max-h-[300px] items-center">
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
                refetchFollowing={refetchFollowing}
                refetchFollowers={refetchFollowers}
            />
            <Following
                open={isFollowingOpen}
                onOpenChange={setIsFollowingOpen}
                following={following}
                refetchFollowing={refetchFollowing}
                refetchFollowers={refetchFollowers}
            />
        </div>
    )
}

export default Account;
