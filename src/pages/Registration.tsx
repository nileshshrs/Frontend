import { Link, useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useTheme } from "../context/ThemeContext";
import { useForm } from "react-hook-form"
import { isValid, z, ZodType } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { FormData } from "../utils/types";
import { registration } from "../api/api";
import { useState } from "react";



//regexp pattern
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,24}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//regexp pattern

//zod validation

const registrationSchema: ZodType<FormData> = z.object({
  email: z.string()
    .regex(EMAIL_REGEX, "email is invalid")
    .min(2, "email cannot be empty").max(255),
  username: z.string().regex(USER_REGEX, "4-24 characters, starts with a letter, allows letters, numbers, underscores, hyphens."),
  password: z.string()
    .regex(PWD_REGEX,
      "8-24 characters, at least one lowercase letter, one uppercase letter, and one digit required."),
})

//zod validation

const Registration = () => {

  const { theme } = useTheme();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null)
  //react hook form
  const form = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
    mode: "onChange"
  });
  const { register, handleSubmit, formState: { errors }, reset, } = form;
  //react hook form

  const onSubmit = (data: FormData) => {
    if (!isValid) {
      return;
    }
    console.log(data)
    mutation.mutate(data)

    reset(); // Reset form after successful submission
  };

  const mutation = useMutation({
    mutationFn: async (data: FormData) => registration(data),
    onSuccess: () => {
      navigate("/", { replace: true })
    },
    onError: (error: any) => {
      // console.log(error)
      setError(error.message)
    },

  })
  const logoSrc = theme ? '/image/logo-light.png' : '/image/logo-dark.png';
  return (
    <main className='h-screen grid place-content-center place-items-center gap-10'>
      <form
        className='w-full sm:w-80 md:w-96 border-0 md:border-[0.5px] h-auto px-12 py-12 grid gap-5 shadow-lg '
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <img src={logoSrc} alt="" />
          <h2 className="text-center font-bold text-muted-foreground font-style-script text-lg">
            Connect with the world around you.
          </h2>
        </div>
        {error && <p className="text-red-700 bg-pink-400 text-[14px] font-bold px-5 py-1">{error}</p>}
        <div>
          <Input
            className='font-medium placeholder:font-light'
            placeholder='email'
            {...register("email")}
            autoComplete="off"
          />
          {errors.email && (
            <p className="text-red-500 text-[12px] mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <Input
            className='font-medium placeholder:font-light'
            placeholder='username'
            {...register("username")}
            autoComplete="off"
          />
          {errors.username && (
            <p className="text-red-500 text-[12px] mt-1">{errors.username.message}</p>
          )}
        </div>
        <div>
          <Input
            className='font-medium placeholder:font-light'
            placeholder='password' type='password'
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-[12px] mt-1">{errors.password.message}</p>
          )}
        </div>
        <div>
          <Button className='w-full text-white font-semibold mt-1' >sign up</Button>
        </div>
        <div className='text-center text-muted-foreground or py-5'>
          OR
        </div>
        <div>
          <p className="text-sm text-muted-foreground w-full text-center"> By signing up, you agree to our <span className="text-white">Terms</span> , <span className="text-white">Privacy Policy</span> and <span className="text-white">Cookies Policy</span>.</p>
        </div>
      </form>
      <div className='w-full sm:w-80 md:w-96 border-0 md:border-[0.5px] h-auto p-5 gap-3 shadow-lg flex justify-center items-center font-medium text-md'>
        <p>Have an account?</p><Link to="/sign-in" className='text-primary'>sign in</Link>
      </div>
    </main>
  )
}

export default Registration