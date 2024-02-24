import { Navigate } from "react-router";
import LoginFormWrapper from "../components/Login/LoginFormWrapper"
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const {user} = useAuth();
    console.log(user)

    if (user) {
        return <Navigate to="/dashboard"/>;
    } else {
        return (
            <LoginFormWrapper />
        );
    }
}

export default LoginPage
