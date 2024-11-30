import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/api';
import { queryClient } from '../main';
import { Button } from './ui/button';
import useAuth from '../hooks/useAuth';
import { RiErrorWarningFill } from "react-icons/ri";

const UserMenu = () => {
    const navigate = useNavigate();
    const { user, isLoading } = useAuth();
    const { mutate: signout } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.clear(); // Clear cached queries (if needed)
            navigate('/sign-in', { replace: true }); // Redirect to login page
        },
    });

    const { email, username, verified } = user // remember to bring the user image as well later

    return (
        isLoading ? <p>Loading...</p> :
            <div className="h-full hidden lg:block w-full lg:max-w-[400px] py-10 px-5">
                <div className="flex items-center justify-center w-full">
                    <div className="w-full inline-flex items-center justify-start gap-5">
                        <div className="">
                            <img
                                src="https://play-lh.googleusercontent.com/jInS55DYPnTZq8GpylyLmK2L2cDmUoahVacfN_Js_TsOkBEoizKmAl5-p8iFeLiNjtE=w526-h296-rw"
                                alt=""
                                width={"50px"}
                                height={"50px"}
                                className="rounded-full w-[50px] h-[50px]"
                            />
                        </div>
                        <div>
                            <div className='font-semibold'>{username}</div>
                            <div className='font-semibold'>{email}</div>
                        </div>
                    </div>
                    <div className="">
                        <Button
                            className="text-primary font-bold"
                            variant={"ghost"}
                            onClick={() => signout()} // Call signout function here
                        >
                            Logout
                        </Button>
                    </div>
                </div>
                {!verified && <Button disabled className='font-bold inline-flex items-center justify-center gap-3 w-full mt-5' variant={"destructive"}><RiErrorWarningFill /> Please verify your email</Button>}
            </div>
    );
};

export default UserMenu;
