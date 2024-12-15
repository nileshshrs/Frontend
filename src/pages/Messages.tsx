import { Link, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { IoIosCreate } from "react-icons/io";
import { useConversations } from "../hooks/useConversation";
import { formatTimeAgo } from "../utils/formatTimeAgo";
import { useState } from "react";
import { CreateChat } from "../components/message/CreateChat";


const Messages = () => {
    const { conversations } = useConversations();
    const { user } = useAuthContext();
    const [isCreateChatOpen, setIsCreateChatOpen] = useState(false); // State to control the dialog

    const handleCreateChatToggle = () => {
        setIsCreateChatOpen((prev) => !prev);
    };

    return (
        <div className="flex h-screen">
            {/* Left Column: Conversations List */}
            <div className="flex flex-col gap-5 py-2 border-r-2 h-full md:min-w-[350px] min-w-[100px] ">
                <div className="flex w-full gap-5 md:justify-between items-center py-5 justify-center px-7">
                    <div className="hidden md:block font-bold text-2xl capitalize">{user?.username}</div>
                    {/* Button to toggle the CreateChat dialog */}
                    <button onClick={handleCreateChatToggle}>
                        <IoIosCreate className="text-3xl" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto max-h-screen ">
                    <div className="flex flex-col h-full ">
                        {conversations &&
                            conversations.map((conversation) => (
                                <Link
                                    to={conversation._id}
                                    key={conversation._id}
                                    className={`transition min-h-[90px] pl-7 py-5 pr-1 h-[90px] w-full flex items-center md:hover:bg-muted ${conversation.read === false ? `bg-muted` : ``
                                        }`}
                                >
                                    <div className="flex w-full items-center gap-7 h-full justify-center">
                                        <div>
                                            <img
                                                src="https://play-lh.googleusercontent.com/jInS55DYPnTZq8GpylyLmK2L2cDmUoahVacfN_Js_TsOkBEoizKmAl5-p8iFeLiNjtE=w526-h296-rw"
                                                alt=""
                                                className="min-w-[50px] h-[50px] rounded-full"
                                            />
                                        </div>
                                        {/* Show only the image on smaller screens (md and sm) */}
                                        <div className="hidden md:flex w-full items-center justify-between">
                                            <div className="w-full">
                                                <div className="text-lg font-semibold">
                                                    {user?._id === conversation.participants[0]._id
                                                        ? conversation.participants[1].username
                                                        : conversation.participants[0].username}
                                                </div>
                                                <div className="w-full text-muted-foreground">
                                                    {conversation.lastMessage.length > 19
                                                        ? `${conversation.lastMessage.slice(0, 19)}...`
                                                        : conversation.lastMessage}
                                                </div>
                                            </div>
                                            <div className="text-muted-foreground text-[10px]">
                                                {formatTimeAgo(conversation.updatedAt)}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>

            {/* Right Column: Message or Conversation */}
            <main className="w-full">
                {/* This will render the Message component when navigating to /messages/:id */}
                <Outlet context={{ isCreateChatOpen, setIsCreateChatOpen }} />
            </main>

            {/* CreateChat dialog */}
            <CreateChat open={isCreateChatOpen} onOpenChange={setIsCreateChatOpen} />
        </div>
    );
};

export default Messages;
