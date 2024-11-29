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
        return response; // response.data is already returned from the interceptor
    } catch (error) {
        // Handle any errors specific to the registration call
        console.error('Registration failed:', error);
        throw error; // Rethrow the error to allow calling functions to handle it
    }
};
