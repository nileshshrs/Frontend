import { FaRegCompass, FaRegPlusSquare } from 'react-icons/fa'
import { IoChatbubbles, IoPersonSharp } from 'react-icons/io5'

const Footer = () => {
    return (
        <div className='fixed bottom-0 w-full md:hidden z-10 bg-background'>
            <div className='flex w-full justify-evenly items-center shadow-lg shadow-white h-[50px] '>
                <div><FaRegCompass className="text-2xl" /></div>
                <div><IoChatbubbles className="text-2xl font-bold" /></div>
                <div><FaRegPlusSquare className="text-2xl font-bold" /></div>
                <div><IoPersonSharp className="text-2xl font-bold" /></div>
            </div>
        </div>
    )
}

export default Footer