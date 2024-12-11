import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useSignin } from '../hooks/useSignin';
import { LoginData } from '../utils/types';

const Login = () => {
    const { theme } = useTheme();
    const { signin, isError } = useSignin()
    const logoSrc = theme === 'light' ? '/image/logo-light.png' : '/image/logo-dark.png';

    const [usernameOrEmail, setUsernameOrEmail] = useState<string>(""); // Use 'string' instead of 'String'

    const [password, setPassword] = useState<string>(""); // Use 'string' instead of 'String'
    const signIn = async (data: LoginData) => {
        await signin(data);
    }
    return (
        <main className='h-screen grid place-content-center place-items-center gap-10'>
            <form className='w-full sm:w-80 md:w-96 border-0 md:border-[0.5px] h-auto px-12 py-12 grid gap-5 shadow-lg'>
                <div>
                    <img src={logoSrc} alt="" />
                </div>
                {isError && (
                    <div className="text-red-500 text-sm py-5">
                        Invalid credentials. Please try again.
                    </div>
                )}
                <div>
                    <Input
                        className='font-medium placeholder:font-light'
                        placeholder='username or email'
                        id="email"
                        autoComplete="off"
                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                    />
                </div>
                <div>
                    <Input
                        className='font-medium placeholder:font-light'
                        placeholder='password'
                        type='password'
                        id="password"
                        autoComplete="off"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === "Enter" && signIn({ usernameOrEmail, password })
                        }
                    />
                </div>
                <div>
                    <Button
                        type='button'
                        className='w-full text-white font-semibold mt-1'
                        onClick={() => signIn({ usernameOrEmail, password })}
                    >
                        login
                    </Button>
                </div>
                <div className='text-center text-muted-foreground or py-5'>
                    OR
                </div>
                <div className='font-light text-sm flex items-center justify-center p-3'>
                    <Link to="/forgot-password">
                        forgot password?
                    </Link>
                </div>
            </form>
            <div className='w-full sm:w-80 md:w-96 border-0 md:border-[0.5px] h-auto p-5 gap-3 shadow-lg flex justify-center items-center font-medium text-md'>
                <p>Don't have an account?</p>
                <Link to="/sign-up" className='text-primary'>sign up</Link>
            </div>
        </main>
    );
};

export default Login;
