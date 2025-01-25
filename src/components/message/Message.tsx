import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMessage, getMessages, updateReadStatus } from "../../api/api";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useConversationByUser } from "../../hooks/useConversation";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { message } from "../../utils/types";
import { useSocketContext } from "../../context/SocketContext"; // Using SocketContext
import Loader from "../utils/Loader";
import ErrorComponent from "../utils/ErrorComponent";
import { FaCircle } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";

const Message = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthContext();
  const queryClient = useQueryClient();
  const { recipientId, recipientName, recipientImage } = useConversationByUser(id!);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);

  const [messages, setMessages] = useState<message[]>([]);

  // Use SocketContext here to manage socket connection and online status
  const { socket, isRecipientOnline } = useSocketContext();

  useEffect(() => {
    if (!socket || !user?._id) return;

    // Listen for incoming messages
    socket.on("get", (data: message) => {
      if (data.conversation === id) {
        setMessages((msg) => [...msg, data]);
        updateReadStatus(id!)
        queryClient.invalidateQueries(["conversations"]);
      } else {
        queryClient.invalidateQueries(["conversations"]);
      }
    });

    // Cleanup the socket on component unmount
    return () => {
      socket.off("get");
    };
  }, [socket, user, id, queryClient, location.pathname]);

  const { data: initialMessages, isLoading, isError } = useQuery({
    queryKey: ["message", id],
    queryFn: () => {
      if (!id) {
        throw new Error("Conversation ID is missing");
      }
      return getMessages(id);
    },
    enabled: !!id,
    onSuccess: (data) => {
      setMessages(data);
    },
  });

  useEffect(() => {
    if (!id) return;

    updateReadStatus(id!)
    queryClient.invalidateQueries(["conversations"]);

  }, [id])

  const mutation = useMutation({
    mutationFn: ({ recipient, content }: { recipient: string; content: string }) =>
      createMessage({ conversationId: id!, recipient, content }),
    onSuccess: (newMessageData) => {
      if (socket) {
        socket.emit("send", newMessageData); // Emit the message to the socket
      }
      queryClient.invalidateQueries(["message", id]);
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageInputRef.current || !messageInputRef.current.value.trim()) return;

    if (!recipientId) {
      console.error("Cannot send message: recipient ID is null.");
      return;
    }

    const newMessage = {
      content: messageInputRef.current.value.trim(),
      recipient: recipientId,
    };

    mutation.mutate(newMessage);
    messageInputRef.current.value = "";
  };

  if (isLoading || !recipientId || !recipientName) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorComponent />;
  }

  return (
    <main className="flex flex-col min-h-screen h-full">
      <div>
        <div className="flex justify-between items-center p-7">
          <div className="flex items-center gap-5">
            <img
              src={recipientImage || "https://play-lh.googleusercontent.com/jInS55DYPnTZq8GpylyLmK2L2cDmUoahVacfN_Js_TsOkBEoizKmAl5-p8iFeLiNjtE=w526-h296-rw"}
              alt={recipientName ?? "username"}
              className="h-50 w-50 rounded-full"
              width={"50px"}
              height={"50px"}
            />
            <div>
              <h2 className="capitalize font-bold">{recipientName}</h2>
              <div className="inline-flex items-center gap-1">
                {isRecipientOnline(recipientId) ? <FaCircle className="text-md" /> : <FaRegCircle className="text-md" />}{" "}
                {isRecipientOnline(recipientId) ? "online" : "offline"}
              </div>
            </div>
          </div>
          <button>
            <IoInformationCircleOutline className="text-2xl" />
          </button>
        </div>
      </div>

      <div className="flex flex-col p-7 gap-4 flex-1 overflow-y-auto max-h-[calc(90vh-100px)]">
        {messages.map((msg: message) => {
          const isSender = msg?.sender?._id === user?._id;
          const senderName = isSender ? msg.sender.username : msg?.recipient?.username;
          const senderImage = isSender
            ? msg.sender?.image?.[0]
            : recipientImage
          return (
            <div
              className={`flex ${isSender ? "flex-row-reverse" : ""} items-end gap-3`}
              key={msg._id}
            >
              <img
                src={senderImage}
                alt={senderName}
                className="h-50 w-50 rounded-full"
                width={"50px"}
                height={"50px"}
              />
              <div
                className={`${isSender ? "ml-4 bg-primary " : "mr-4 bg-muted"
                  } max-w-[500px] px-5 py-2 text-sm font-semibold rounded-md`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-5 border-t relative">
        <textarea
          ref={messageInputRef}
          style={{
            scrollbarWidth: "none"
          }}
          className="wrap w-full bg-background h-[40px] focus:outline-none rounded-3xl border resize-none px-5 pr-16 py-2"
        />
        <Button
          onClick={handleSendMessage}
          className="rounded-3xl px-5 absolute right-[2%] h-[40px] font-semibold text-white"
        >
          Send
        </Button>
      </div>
    </main>
  );
};

export default Message;
