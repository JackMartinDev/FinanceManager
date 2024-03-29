import axios, {AxiosInstance} from "axios"

export const client: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});
