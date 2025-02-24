import { FaRegCompass, FaRegPlusSquare } from 'react-icons/fa'
import { IoChatbubbles, IoPersonSharp } from 'react-icons/io5'
import { Link } from 'react-router-dom'
interface FooterProps {
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}
const Footer = ({ onOpenChange }: FooterProps) => {

    return (
        <div className='fixed bottom-0 w-full md:hidden z-10 bg-background'>
            <div className='flex w-full justify-evenly items-center shadow-lg shadow-white h-[50px] '>
                <Link to="/"><FaRegCompass className="text-2xl" /></Link>
                <div onClick={() => onOpenChange(true)}><FaRegPlusSquare className="text-2xl font-bold" /></div>
                <Link to="/messages"><IoChatbubbles className="text-2xl font-bold" /></Link>
                <Link to="/account"><IoPersonSharp className="text-2xl font-bold" /></Link>
            </div>
        </div>
    )
}

export default Footer