import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "../context/AuthContext";

const useSocket = (id: string | null) => {
    const { user } = useAuthContext()
    const [socket, setSocket] = useState<any>(null);
    const [onlineUsers, setOnlineUsers] = useState<{ userID: string, socketID: string }[]>([]);

    useEffect(() => {
        if (!user) return;

        // Initialize the socket connection
        const newSocket = io("http://localhost:6278");
        setSocket(newSocket);

        // Add the user when the socket connects
        newSocket.on("connect", () => {
            console.log(`Connected with socket ID: ${newSocket.id}`);
            newSocket.emit("adduser", user._id); // Emit adduser only once on connection
        });

        // Log all users for debugging
        newSocket.on("getusers", (data) => {
            console.log("Active users:", data);
            setOnlineUsers(data);
        });

       

        // Clean up on unmount or user change
        return () => {
            newSocket.disconnect();
            console.log("Socket disconnected");
        };
    }, [user]); // Reinitialize only when the user changes

    const isRecipientOnline = onlineUsers.some(user => user.userID === id);
    console.log(isRecipientOnline)

    return { socket, isRecipientOnline };
};

export default useSocket;
