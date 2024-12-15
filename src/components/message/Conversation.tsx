import { Button } from "../ui/button";
import { IoChatbubblesOutline } from "react-icons/io5";
import { useOutletContext } from "react-router-dom";

interface CreateChatContext {
    setIsCreateChatOpen: (open: boolean) => void;
}

const Conversation = () => {
    // Access the context from the Outlet
    const { setIsCreateChatOpen } = useOutletContext<CreateChatContext>();

    const handleOpenCreateChat = () => {
        setIsCreateChatOpen(true); // Open the CreateChat dialog
    };

    return (
        <div className="min-h-screen h-full flex flex-col gap-3 items-center justify-center">
            <div>
                <IoChatbubblesOutline className="text-9xl" />
            </div>
            <div className="font-bold text-lg">Your messages</div>
            <div>Send a message to start chat</div>
            <div>
                {/* Trigger the CreateChat dialog on button click */}
                <Button
                    onClick={handleOpenCreateChat}
                    className="text-white font-semibold"
                >
                    Send message
                </Button>
            </div>
        </div>
    );
};

export default Conversation;
