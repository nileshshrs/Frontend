import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/api';
import { queryClient } from '../main';
import { Button } from './ui/button';
import useAuth from '../hooks/useAuth';

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

    console.log(user)
    return (
        isLoading ? <p>Loading...</p> :
            <div className="h-full hidden lg:block w-full lg:max-w-[400px] py-10">
                <div className="flex items-center justify-evenly">
                    <div className="w-full inline-flex items-center justify-start gap-5">
                        <div className="">
                            <img
                                src="https://play-lh.googleusercontent.com/jInS55DYPnTZq8GpylyLmK2L2cDmUoahVacfN_Js_TsOkBEoizKmAl5-p8iFeLiNjtE=w526-h296-rw"
                                alt=""
                                width={"50px"}
                                height={"50px"}
                                className="rounded-full"
                            />
                        </div>
                        <div>
                            <div>username</div>
                            <div>email</div>
                        </div>
                    </div>
                    <div className="w-full">
                        <Button
                            className="text-primary font-bold"
                            variant={"ghost"}
                            onClick={() => signout()} // Call signout function here
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
    );
};

export default UserMenu;
