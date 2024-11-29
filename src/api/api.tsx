import { accessSync } from "fs";
import { LoginData, FormData } from "../utils/types";
import API from "./apiClient";
import { AxiosResponse } from 'axios';


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
        return response.data; // response.data is already returned from the interceptor
    } catch (error) {
        // Handle any errors specific to the registration call
        console.error('Registration failed:', error);
        throw error; // Rethrow the error to allow calling functions to handle it
    }
};



export const verifyEmail = async (verificationCode: string): Promise<any> => {
    try {
        const response = await API.get(`/auth/verify-email/${verificationCode}`);
        return response.data; // Ensure you are returning data here
    } catch (e: any) {
        console.error("Error verifying email:", e.message || e);
        return { error: true, message: e.message || "Error verifying email." }; // Return an error response
    }
};


export const forgotPassword = async (email: any) => await API.post(`/auth/account-recovery`, email)
export const resetPassword = async (request: any) => {
    console.log(request)
    await API.post(`/auth/reset-password`, request)
};
