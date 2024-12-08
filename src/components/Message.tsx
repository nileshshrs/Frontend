import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMessage, getMessages } from "../api/api";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useConversationById } from "../hooks/useConversation";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { io } from "socket.io-client";
import { message } from "../utils/types";

const Message = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthContext();
  const queryClient = useQueryClient();

  const [messages, setMessages] = useState<message[]>([]);
  const [socket, setSocket] = useState<any>(null)

  useEffect(() => {
    const newSocket = io("http://localhost:6278");
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log(`Connected with socket ID: ${newSocket.id}`);
    });

    return () => {
      newSocket.disconnect();
      console.log("Socket disconnected");
    };
  }, [user]);


  useEffect(() => {
    if (!socket) return;

    socket?.emit("adduser", user._id);
    socket?.on("getusers", (data:[]) => {
      console.log("Users:", data);
    });

    socket?.on("get", (data: message) => {
      console.log("socket data", data)
      if (data.conversation === id) {
        setMessages(msg => [...msg, data])
        queryClient.invalidateQueries(['conversations']);
      } else {
        queryClient.invalidateQueries(['conversations']);
      }
    });

    return () => {
      socket.disconnect();
      console.log("Socket disconnected");
    };
  }, [socket]); // dependency is 'socket'



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
      setMessages(data); // Set initial messages
    },
  });
  //do not touch
  const mutation = useMutation({
    mutationFn: ({ recipient, content }: { recipient: string; content: string }) =>
      createMessage({ conversationId: id!, recipient, content }),
    onSuccess: (newMessageData) => {
      // Once the message is created, emit the message via socket
      if (socket) {
        socket.emit("send", newMessageData); // Send the new message to the server through Socket.IO
      }
      queryClient.invalidateQueries(["message", id]);
      queryClient.invalidateQueries(['conversations']);
    },
  });

  const conversation = useConversationById(id);
  const recipientId =
    conversation?.participants &&
      conversation?.participants.length === 2 &&
      user
      ? user._id === conversation?.participants[0]._id
        ? conversation?.participants[1]._id
        : conversation?.participants[0]._id
      : null;

  const recipientName =
    user._id === conversation?.participants[0]._id
      ? conversation?.participants[1].username
      : conversation?.participants[0].username;

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messageInputRef = useRef<HTMLTextAreaElement | null>(null);


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  //do not touch

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

    mutation.mutate(newMessage); // Send the message

    messageInputRef.current.value = ""; // Clear the input field
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading messages</div>;

  return (
    <main className="flex flex-col min-h-screen h-full">
      <div>
        <div className="flex justify-between items-center p-7">
          <div className="flex items-center gap-5">
            <div>
              <img
                src="https://play-lh.googleusercontent.com/jInS55DYPnTZq8GpylyLmK2L2cDmUoahVacfN_Js_TsOkBEoizKmAl5-p8iFeLiNjtE=w526-h296-rw"
                alt={recipientName}
                className="h-50 w-50 rounded-full"
                width={"50px"}
                height={"50px"}
              />
            </div>
            <div className="capitalize">{recipientName}</div>
          </div>
          <div>more info</div>
        </div>
      </div>

      {/* Message Container */}
      <div className="flex flex-col p-7 gap-4 flex-1 overflow-y-auto max-h-[calc(90vh-100px)]">
        {messages.map((msg: any, index: number) => {
          const isSender = msg?.sender?._id === user._id;
          const senderName = isSender ? msg.sender.username : msg?.recipient?.username;

          return (
            <div
              className={`flex ${isSender ? "flex-row-reverse" : ""} items-end justify-baseline`}
              key={msg._id || index}
            >
              <div className={`${isSender ? "ml-4" : "mr-4"}`}>
                <img
                  src="https://play-lh.googleusercontent.com/jInS55DYPnTZq8GpylyLmK2L2cDmUoahVacfN_Js_TsOkBEoizKmAl5-p8iFeLiNjtE=w526-h296-rw"
                  alt={senderName}
                  className="h-50 w-50 rounded-full"
                  width={"50px"}
                  height={"50px"}
                />
              </div>
              <div
                className={`${isSender ? "ml-4 bg-primary " : "mr-4 bg-muted"} max-w-[500px] px-5 py-2 text-sm font-semibold rounded-md`}
              >
                {msg.content}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} /> {/* This ensures the scroll position is maintained */}
      </div>

      {/* Message Input */}
      <div className="p-5 border-t relative">
        <textarea
          ref={messageInputRef}
          name=""
          id=""
          className="wrap relative w-full bg-background h-[40px] focus:outline-none rounded-3xl border resize-none px-5 pr-16 py-2"
        />
        <Button
          onClick={handleSendMessage}
          className="rounded-3xl px-5 absolute right-[2%] h-[40px] font-semibold text-white"
        >
          send
        </Button>
      </div>
    </main>
  );
};

export default Message;
// useEffect(() => {
//   socket.current = io("http://localhost:6278");
//   socket.current.on("welcome", data => {
//     console.log(data)
//   })

//   const handleReconnect = () => {
//     if (user) {
//       socket.current.emit("sendUser", user._id); // Re-register user after reconnection
//     }
//   };

//   socket.current.on("connect", handleReconnect);
// }, [user]);

// useEffect(() => {
//   socket.current = io("http://localhost:6278")
//   socket.current.on("getmessage", (data) => {
//     console.log("Received message: ", data);
//     if (data.conversationID == id) {
//       setMessages((prevMessages) => [...prevMessages, data]);
//       queryClient.invalidateQueries(["conversations"]);
//     } else {
//       queryClient.invalidateQueries(["conversations"]);
//     }
//   })
// }, []);