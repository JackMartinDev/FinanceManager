import axios, {AxiosInstance} from "axios"
import { useAuth } from "../context/AuthContext";

export const client: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});


client.interceptors.response.use(
    response => {
        return response
    },
    function(error){
        const status = error.response.status;
        switch(status){
            case 401:
                console.log("Authorization failed");
                localStorage.removeItem("authToken");
                break;
            case 402:
                console.log("Wow thats pretty wild");
                break;
            default:
                console.log("Something went wrong")
        }
        return Promise.reject(error);
    }
)

