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