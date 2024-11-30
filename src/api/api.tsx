import { LoginData, FormData } from "../utils/types";
import API from "./apiClient";
import { AxiosResponse } from 'axios';


export const logout = async () => {
    try {
        const res = API.get('/auth/logout')
        console.log(res)
        return res; // Ensure you are returning data here
    } catch (e) {
        console.log(e)
        throw e;
    }
}
export const login = async (data: LoginData) => {
    try {
        const response = await API.post("/auth/sign-in", data);
        return response; // response.data is already returned from the interceptor
    } catch (error) {
        // Handle any errors specific to the login call
        console.error('Login failed:', error);
        throw error; // Rethrow the error to allow calling functions to handle it
    }
};

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



export const verifyEmail = async (verificationCode: string): Promise<any> => {
    try {
        const response = await API.get(`/auth/verify-email/${verificationCode}`);
        return response; // Ensure you are returning data here
    } catch (e: any) {
        console.log("Error verifying email:", e.message || e);
        throw e
    }
};


export const forgotPassword = async (email: string): Promise<any> => await API.post(`/auth/account-recovery`, email)
export const resetPassword = async (request: {}): Promise<any> => {
    console.log(request)
    await API.post(`/auth/reset-password`, request)
};


export const getUserProfile = async (): Promise<any> => {
    try {
        const res = await API.get("/user/profile");
        return res
    } catch (e: any) {
        throw e.message;
    }
};
