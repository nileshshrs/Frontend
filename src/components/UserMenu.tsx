import { Button } from './ui/button';
import { RiErrorWarningFill } from "react-icons/ri";
import { useAuthContext } from '../context/AuthContext';
import { useLogout } from '../hooks/useLogout';

const UserMenu = () => {
    const { user } = useAuthContext();
    const {logout} = useLogout()


    if (!user) {
        return
    }

    return (
        <div className="h-full hidden lg:block w-full lg:max-w-[380px] py-10 px-5">
            <div className="flex items-center justify-center w-full">
                <div className="w-full inline-flex items-center justify-start gap-5">
                    <div>
                        {/* User avatar */}
                        <img
                            src={user.image[0] ||`https://play-lh.googleusercontent.com/jInS55DYPnTZq8GpylyLmK2L2cDmUoahVacfN_Js_TsOkBEoizKmAl5-p8iFeLiNjtE=w526-h296-rw`}
                            alt={user?.username}
                            width="50px"
                            height="50px"
                            className="rounded-full w-[50px] h-[50px] border-2 border-primary"
                        />
                    </div>
                    <div>
                        {/* Display username and email */}
                        <div className="font-semibold">{user?.username}</div>
                        <div className="font-semibold text-muted-foreground text-sm">{user?.email}</div>
                    </div>
                </div>
                <div>
                    {/* Logout Button */}
                    <Button
                        className="text-primary font-bold"
                        variant={"ghost"}
                        onClick={() => logout()} // Call signout function here
                    >
                        Logout
                    </Button>
                </div>
            </div>
            {/* Show verification warning if not verified */}
            {!user?.verified && (
                <Button disabled className="font-bold inline-flex items-center justify-center gap-3 w-full mt-5" variant={"destructive"}>
                    <RiErrorWarningFill /> Please verify your email
                </Button>
            )}
        </div>
    );
};

export default UserMenu;
