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
}

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
    sender: {
        _id: string;
        name: string;

    };
    recipient: {
        _id: string;
        name: string;
    };
    type: "text" | "image" | "video" | "file";
    read: boolean;
    content: string;
    createdAt: string;

}

