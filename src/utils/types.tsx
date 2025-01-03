export type LoginData = {
    usernameOrEmail: string;
    password: string;
}

export type FormData = {
    email: string;
    username: string;
    password: string;
}

export type toggler = {
    isCollapsed: boolean;
    onToggle: () => void;
    onNotificationToggle: () => void;
    onSearchToggle: () => void;
    setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
    onOpenChange: React.Dispatch<React.SetStateAction<boolean>>; // Accept a boolean argument
};


export interface Participant {
    _id: string;
    username: string;
    image?: string;
}


export interface conversation {
    _id: string;
    createdAt: string;
    updatedAt: string;
    lastMessage: string;
    participants: Participant[];
    read?: boolean;
}
export interface message {
    _id: string;
    conversation: string;
    sender: Participant;
    recipient: Participant;
    type: "text" | "image" | "video" | "file";
    read: boolean;
    content: string;
    createdAt: string;

}

export type User = {
    status: string;
    isOnlineStatus: boolean;
    _id: string;
    email: string;
    username: string;
    verified: boolean;
    image: string;  // Assuming it's a URL or empty string
    __v: number;

};


export type Connections = {
    _id: string;
    username: string;
    email: string;
    image: string;

}

export interface CreateConversationParams {
    participants: string[];
}

export interface UploadResults {
    progress: number;
    error: Error | any; 
    urls: string [];
    uploadImages: (files: File[])=> Promise<void>   ;

}

export interface posts {
    content: string,
    image: string[]
}
export interface fetchedPost{
    _id: string,
    user: User,
    content: string,
    image: string,
    createdAt: string
}