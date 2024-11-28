import API from "./apiClient";

type LoginData = {
    usernameOrEmail: string;
    password: string;
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
