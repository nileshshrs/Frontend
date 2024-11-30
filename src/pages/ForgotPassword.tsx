import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Link } from 'react-router-dom'
import { IoLockClosedOutline } from "react-icons/io5";
import { isValid, z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPassword } from '../api/api';
import { useMutation } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';

export type FormData = {
    email: string;
}
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const registrationSchema: ZodType<FormData> = z.object({
    email: z.string()
        .regex(EMAIL_REGEX, "email is invalid")
        .min(2, "email cannot be empty").max(255),
})

const ForgotPassword = () => {


    //react hook form
    const form = useForm<FormData>({
        resolver: zodResolver(registrationSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (data: FormData) => {
        if (!isValid) {
            return;
        }
        mutate(data.email)
        reset(); // Reset form after successful submission
    };

    const { register, handleSubmit, formState: { errors }, reset, } = form;

    const { mutate, isSuccess, isError } = useMutation({
        mutationFn: (data: string) => forgotPassword(data),
    })
    //react hook form
    return (
        <main className='min-h-screen grid place-content-center place-items-center'>
            {
                isSuccess ?
                    <Card className="max-w-sm w-full flex items-center justify-center">
                        <CardContent>
                            <CardHeader className="flex-col items-center justify-center gap-5">
                                <CardTitle>Password reset.</CardTitle>
                                <CardDescription className='text-center'>Password reset email has been sent successfully.</CardDescription>
                            </CardHeader>
                            <CardFooter className="flex items-center justify-center">
                                <Link to="/sign-in" className="text-primary text-sm font-bold" replace>
                                    sign in
                                </Link>
                            </CardFooter>
                        </CardContent>
                    </Card>
                    :
                    <>
                        <form className='w-full sm:w-80 md:w-96 border-0 md:border-[0.5px] h-auto px-12 py-12 grid gap-5 shadow-lg'
                            onSubmit={handleSubmit(onSubmit)}
                        >
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
                                {
                                    isError && <p className="text-red-700 bg-pink-400 text-[14px] font-bold px-5 py-1 w-full">Email not found.</p>
                                }
                            </div>
                            <div>
                                <Input
                                    className='font-medium placeholder:font-light'
                                    placeholder='email'
                                    type="email"
                                    id="email"
                                    autoComplete="off"
                                    {...register('email')}
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-[12px] mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <Button className='w-full text-white font-semibold mt-1' >send</Button>
                            </div>
                            <div className='text-center text-muted-foreground or py-5'>
                                OR
                            </div>
                            <div className='text-sm font-bold flex items-center justify-center p-3'>
                                <Link to="/sign-in">
                                    sign in
                                </Link>
                            </div>
                        </form>
                    </>
            }
        </main >
    )
}

export default ForgotPassword