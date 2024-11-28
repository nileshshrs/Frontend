import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
import { IoLockClosedOutline } from "react-icons/io5";

const ForgotPassword = () => {
    return (
        <main className='h-screen grid place-content-center place-items-center'>
            <form className='w-full sm:w-80 md:w-96 border-0 md:border-[0.5px] h-auto px-12 py-12 grid gap-5 shadow-lg'>
                <div className='grid gap-5 place-items-center place-content-center'>
                    <div className='text-center border-2 border-custom-border p-5 rounded-full flex items-center justify-center'>
                        <IoLockClosedOutline className='text-6xl' />
                    </div>
                    <h2 className="text-center font-bold text-muted-foreground text-xl text-white">
                        Trouble logging in?
                    </h2>
                    <p className='text-center text-sm text-muted-foreground'>
                        Enter your email, phone, or username and we'll send you a link to get back into your account.
                    </p>
                </div>
                <div>
                    <Input
                        className='font-medium placeholder:font-light'
                        placeholder='username or email'
                        type="email"
                        id="email"
                        autoComplete="off"
                    />
                </div>

                <div>
                    <Button className='w-full text-white font-semibold mt-1' >login</Button>
                </div>
                <div className='text-center text-muted-foreground or py-5'>
                    OR
                </div>
                <div className='text-sm font-bold flex items-center justify-center p-3'>
                    <Link to="/sign-up">
                        Create new account.
                    </Link>
                </div>
            </form>
            <div className='bg-0appBar w-full sm:w-80 md:w-96 border-0 md:border-[0.5px] h-auto p-2 gap-3 shadow-lg flex justify-center items-center font-medium text-md'>
                <Link to="/sign-in" className='text-primary font-semibold'>Back to login</Link>
            </div>
        </main>
    )
}

export default ForgotPassword