import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useTheme } from "../context/ThemeContext";

const Registration = () => {
  const { theme } = useTheme();
  const logoSrc = theme ? '/image/logo-light.png' : '/image/logo-dark.png';
  return (
    <main className='h-screen grid place-content-center place-items-center gap-10'>
      <div className='w-full sm:w-80 md:w-96 border-0 md:border-[0.5px] h-auto px-12 py-12 grid gap-5 shadow-lg'>
        <div>
          <img src={logoSrc} alt="" />
          <h2 className="text-center font-bold text-muted-foreground font-style-script text-lg">
            Connect with the world around you.
          </h2>
        </div>
        <div>
          <Input className='font-medium placeholder:font-light' placeholder='username or email' />
        </div>
        <div>
          <Input className='font-medium placeholder:font-light' placeholder='password' type='password' />
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
      </div>
      <div className='w-full sm:w-80 md:w-96 border-0 md:border-[0.5px] h-auto p-5 gap-3 shadow-lg flex justify-center items-center font-medium text-md'>
        <p>Have an account?</p><Link to="/sign-in" className='text-primary'>sign in</Link>
      </div>
    </main>
  )
}

export default Registration