import axios, {AxiosInstance} from "axios"

export const client: AxiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
    headers: {
        "Content-Type": "application/json",
    },
});
