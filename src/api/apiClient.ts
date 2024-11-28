import axios from 'axios';

const options = {
    baseURL: "http://localhost:6278/api/v1",
    withCredentials: true,
}

const API = axios.create(options);

// Interceptor for responses
API.interceptors.response.use(
    (response) => response.data, // Return only the response data
    (error) => {
        const { status, data } = error.response
        console.log(status, data)
        // Handle error globally
        return Promise.reject({ status, ...data }); // Reject the error to propagate it to the calling function
    }
);

export default API;
