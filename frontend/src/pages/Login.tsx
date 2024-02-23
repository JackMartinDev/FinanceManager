import { Navigate } from "react-router";
import LoginForm from "../components/Login/LoginForm"
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const {user} = useAuth();
    console.log(user)

    if (user) {
        return <Navigate to="/dashboard"/>;
    } else {
        return (
            <LoginForm />
        );
    }
}

export default LoginPage
