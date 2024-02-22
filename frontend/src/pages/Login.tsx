import { ActionFunction, redirect } from "react-router"
import LoginForm from "../components/Login/LoginForm"
import axios, {AxiosResponse} from "axios"
import { client } from "../utils/axios"

const LoginPage = () => {
    return(
        <LoginForm/>
    )
}

export default LoginPage

export const action:ActionFunction = async({request}) =>{
    const data = await request.formData();
    const loginData = {
        email: data.get("email"),
        password: data.get("password")
    };

    try {
        const response: AxiosResponse = await client.post("auth/login", loginData);
        console.log(response);
        return redirect("/dashboard");

    } catch (error) {
        if(axios.isAxiosError(error)){
            console.log(error.response?.status);
            console.log(error.response);
            return error.response?.data;
        } else {
            console.log(error);
            throw new Error("Something went wrong!");
        }
    }
}
