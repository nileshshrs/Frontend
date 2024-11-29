import { IoLockClosedOutline } from "react-icons/io5";
import { Link,  useSearchParams } from "react-router-dom"
import { Button } from "../components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { resetPassword } from "../api/api";

export type FormData = {
  password: string;
}
const registrationSchema: ZodType<FormData> = z.object({
  password: z.string()
    .min(8).max(24)
})
const ResetPassword = () => {

  const [searchParams] = useSearchParams();
  const verificationCode: any = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();

  const isValid = verificationCode && exp && exp > now;
  const form = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (data: { password: any }) => {
    if (!isValid) {
      return;
    }
    mutate({ ...data, verificationCode })
    reset(); // Reset form after successful submission
  };

  const { register, handleSubmit, formState: { errors }, reset, } = form;

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: async (data: any) => { resetPassword(data) },
    onSuccess: () => {

    },
    onError: (error: any) => {
      console.error('Reset password failed:', error);
      alert('Failed to reset password');
    },
  })

  if (!isValid) {
    <main className='min-h-screen grid place-content-center place-items-center'>
      <Card className="max-w-sm w-full flex items-center justify-center">
        <CardContent>
          <CardHeader className="flex-col items-center justify-center gap-5">
            <CardTitle>Invalid link .</CardTitle>
            <CardDescription className='text-center'>Your password link may have expired?.</CardDescription>
          </CardHeader>
          <CardFooter className="flex items-center justify-center">
            <Link to="/forgot-password" className="text-primary text-sm font-bold" replace>
              forgot password?
            </Link>
          </CardFooter>
        </CardContent>
      </Card>
    </main>
    return
  }

  return (
    <main className='min-h-screen grid place-content-center place-items-center'>
      {
        isSuccess ? <Card className="max-w-sm w-full flex items-center justify-center">
          <CardContent>
            <CardHeader className="flex-col items-center justify-center gap-5">
              <CardTitle>Invalid link .</CardTitle>
              <CardDescription className='text-center'>Your password link may have expired?.</CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-center">
              <Link to="/sign-in" className="text-primary text-sm font-bold" replace>
                sign in
              </Link>
            </CardFooter>
          </CardContent>
        </Card> : <form className='w-full sm:w-80 md:w-96 border-0 md:border-[0.5px] h-auto px-12 py-12 grid gap-5 shadow-lg'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='grid gap-5 place-items-center place-content-center'>
            <div className='text-center border-2 border-custom-border p-5 rounded-full flex items-center justify-center'>
              <IoLockClosedOutline className='text-6xl' />
            </div>
            <h2 className="text-center font-bold text-muted-foreground text-xl text-white">
              Reset password.
            </h2>
          </div>
          <div>
            <Input
              className='font-medium placeholder:font-light'
              placeholder='password'
              autoComplete="off"
              {...register('password')}
            />
            {errors.password && (
              <p className="text-red-500 text-[12px] mt-1">{errors.password.message}</p>
            )}
          </div>

          <div>
            <Button className='w-full text-white font-semibold mt-1' >reset password</Button>
          </div>
          <div className='text-center text-muted-foreground or py-5'>
            OR
          </div>
          <div className='text-sm font-bold flex items-center justify-center p-3'>
            <Link to="/sign-up">
              sign in
            </Link>
          </div>
        </form>
      }
    </main>
  )
}

export default ResetPassword