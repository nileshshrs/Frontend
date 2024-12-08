import { Link, Outlet } from "react-router-dom"
import { useAuthContext } from '../context/AuthContext'
import { IoIosCreate } from "react-icons/io"
import { useConversations } from "../hooks/useConversation"
import { formatTimeAgo } from "../utils/formatTimeAgo"


const Messages = () => {

    const { conversations } = useConversations()

    const { user } = useAuthContext()


    return (
        <div className="flex justify-between ">
            {/* Left Column: Conversations List */}
            <div className="flex flex-col gap-5 px-4 py-2 border-r-2 min-w-[100px] lg:min-w-[400px]">
                <div className="flex w-full gap-5 md:justify-between items-center py-5 justify-center">
                    <div className="hidden md:block font-semibold text-2xl">{user?.username}</div>
                    <button>
                        <IoIosCreate className="text-3xl" />
                    </button>
                </div>
                <div className="h-full">
                    <div className="flex flex-col gap-5">
                        {conversations && conversations.map((conversation) => (
                            <Link
                                to={conversation._id}
                                key={conversation._id}
                                className={`min-h-[75px] h-[75px] w-full flex items-center md:hover:bg-muted ${conversation.read === false ? `bg-muted` : ``} `}
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
                                            <div className="text-lg font-semibold">{user._id === conversation.participants[0]._id ? conversation.participants[1].username : conversation.participants[0].username}</div>
                                            <div className="w-full text-muted-foreground">{conversation.lastMessage}</div>
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
                <Outlet />
            </main>
        </div>
    )
}

export default Messages
