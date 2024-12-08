import { Button } from "./ui/button"
import { IoChatbubblesOutline } from "react-icons/io5";

const Conversation = () => {
    return (
        <div className="min-h-screen h-full flex flex-col gap-3 items-center justify-center">
            <div><IoChatbubblesOutline className="text-9xl" /></div>
            <div className="font-bold text-lg">Your messages</div>
            <div>send a message to start chat</div>
            <div>
                <Button className="text-white font-semibold">Send message</Button>
            </div>
        </div>
    )
}

export default Conversation
