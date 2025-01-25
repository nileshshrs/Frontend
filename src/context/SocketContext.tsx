// SocketContext.tsx
import { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { useAuthContext } from "../context/AuthContext";

// Define the socket context type
interface SocketContextType {
    socket: Socket | null;
    onlineUsers: { userID: string, socketID: string }[];
    isRecipientOnline: (id: string | null) => boolean;
    connectSocket: (userId: string) => void;
    disconnectSocket: () => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);



export const SocketProvider = ({ children }:{ children: ReactNode }) => {
    const { user } = useAuthContext();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<{ userID: string, socketID: string }[]>([]);

    useEffect(() => {
        if (!user) return;

        // Initialize the socket connection
        const newSocket = io("http://localhost:6278");
        setSocket(newSocket);

        // Add the user when the socket connects
        newSocket.on("connect", () => {
            newSocket.emit("adduser", user._id); // Emit adduser only once on connection
        });

        // Log all users for debugging
        newSocket.on("getusers", (data) => {
            // console.log(data)
            setOnlineUsers(data);
        });

        return () => {
            newSocket.disconnect();
        };
    }, [user]);

    const isRecipientOnline = (id: string | null) => {
        return onlineUsers.some(user => user.userID === id);
    };

    const connectSocket = (userId: string) => {
        socket?.emit("adduser", userId);
    };

    const disconnectSocket = () => {
        socket?.disconnect();
    };

    return (
        <SocketContext.Provider value={{ socket, onlineUsers, isRecipientOnline, connectSocket, disconnectSocket }}>
            {children}
        </SocketContext.Provider>
    );
};
export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocketContext must be used within a SocketProvider");
    }
    return context;
};
