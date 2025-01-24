import { LoginData, FormData, CreateConversationParams, posts } from "../utils/types";
import API from "./apiClient";
import { AxiosResponse } from 'axios';

//logout
export const Logout = async () => {
    try {
        const res = API.get('/auth/logout')
        console.log(res)
        return res; // Ensure you are returning data here
    } catch (e) {
        console.log(e)
        throw e;
    }
}
//login
export const login = async (data: LoginData): Promise<any> => {
    try {
        const response = await API.post("/auth/sign-in", data);
        return response; // response.data is already returned from the interceptor
    } catch (error) {
        // Handle any errors specific to the login call
        console.error('Login failed:', error);
        throw error; // Rethrow the error to allow calling functions to handle it
    }
};

//registration
export const registration = async (data: FormData): Promise<AxiosResponse<any>> => {
    try {
        const response = await API.post("/auth/sign-up", data);
        return response; // response.data is already returned from the interceptor
    } catch (error) {
        // Handle any errors specific to the registration call
        console.log('Registration failed:', error);
        throw error; // Rethrow the error to allow calling functions to handle it
    }
};


//verify email
export const verifyEmail = async (verificationCode: string): Promise<any> => {
    try {
        const response = await API.get(`/auth/verify-email/${verificationCode}`);
        return response; // Ensure you are returning data here
    } catch (e: any) {
        console.log("Error verifying email:", e.message || e);
        throw e
    }
};

//forgot password
export const forgotPassword = async (email: string): Promise<any> => await API.post(`/auth/account-recovery`, email)
//reset password
export const resetPassword = async (request: {}): Promise<any> => {
    console.log(request)
    await API.post(`/auth/reset-password`, request)
};

// this might not be needed im not sure since im using the data saved in localstorage after fetching right after logging in
export const getUserProfile = async (): Promise<any> => {
    try {
        const res = await API.get("/user/profile");
        return res
    } catch (e: any) {
        throw e.message;
    }
};
//fetching session
export const getSessions = async (): Promise<any> => API.get("/session/getSessionsByUser")
//deleting session
export const deleteSession = async (id: string): Promise<any> => {
    try {
        const res = API.delete(`/session/delete/${id}`)
        console.log(res)
        return res
    }
    catch (e: any) {
        console.log(e)
    }
}
//fetching all conversation
export const getConversation = async (): Promise<any> => API.get("/conversation/get")
//fetching messages by conversation id
export const getMessages = async (id: string): Promise<any> => API.get(`/messages/conversation/${id}`)
//creating messages
export const createMessage = async ({ conversationId, recipient, content }: {
    conversationId: string;
    recipient: string;
    content: string;
}) => await API.post(
    `/messages/create/${conversationId}`,
    {
        recipient,
        content,
    })

//for sending messages to all followers/following by user
export const getConnection = async (): Promise<any> => {
    try {
        const res = API.get("/follow/connections")
        return res;
    } catch (e) {
        console.log(e)
    }
}
//create conversation
export const createConversation = async (participants: CreateConversationParams): Promise<any> => {
    try {
        const res = API.post("/conversation/create", participants)
        return res
    } catch (e) {
        console.log(e)
    }
}
//fetching conversation by id
export const getConversationByID = async (id: string): Promise<any> => API.get(`/conversation/get/${id}`);
//create post
export const createPost = async (post: posts) => {
    try {
        const res = API.post("/post/create", post);
        return res
    } catch (e) {
        console.log(e);
    }
}
//fetching all post of user and user he follows
export const fetchPosts = async (page: number): Promise<any> => API.get(`/post/get?page=${page}&limit=5`);
//fetching followings
export const getFollowings = async (id: string | undefined): Promise<any> => {
    try {
        const response = await API.get(`/follow/get/following/${id}`);
        // console.log(response)
        return response; // Ensure you return the `data` property from the response
    } catch (error) {
        console.error("Error fetching followings:", error);
        throw error; // Rethrow the error so React Query can handle it
    }
};
//fetching followers
export const getFollowers = async (id: string | undefined): Promise<any> => API.get(`follow/get/followers/${id}`)
//this is api below is for calling post is for account page not to be mistaken for other user's profile page
export const getPostsByUser = async (): Promise<any> => API.get("/post/getByUser")
//deleting following by follow id
export const deleteFollow = async (id: string): Promise<any> => API.delete(`follow/unfollow/${id}`)
//fetching all users
export const getAllUsers = async (): Promise<any> => API.get("/user/all");
//fetching users by user id
export const getUserByID = async (id: string): Promise<any> => API.get(`/user/${id}`)
//this api below is for fetching user posts by user id for user profile page
export const getPostsByUserID = async (id: string): Promise<any> => API.get(`post/get/user/${id}`)

export const unfollowUser = async (followerID: string, followingID: string): Promise<any> =>
    API.delete('follow/unfollow', {
        data: { followerID, followingID },
    });

export const followUser = async (id: string): Promise<any> => API.post(`follow/${id}`);
export const updateUserProfile = async (userData: { username?: string, fullname?: string, email?: string, image?: string, bio?: string, }): Promise<any> => {
    console.log(userData)
    // Make sure to pass the userData object with the fields you want to update
    return API.patch('user/update', userData); // Assuming 'user/update' is your PATCH endpoint
};
