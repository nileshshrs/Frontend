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
    read: string | null;
    
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
    bio: string;
    fullname?: string;
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
    _id? : string,
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

export interface Follows {
    _id: string,
    follower: Connections,
    following: Connections,
    match: boolean
}

export interface Comments {
    _id: string;
    post: string;
    comment: string;
    createdAt: string;
    updatedAt: string;
    user: {
        _id: string;
        username: string;
        image: string[]; // Assuming image is an array
    };
}
