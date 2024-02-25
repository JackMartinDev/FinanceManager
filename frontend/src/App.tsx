import {createBrowserRouter, RouterProvider} from "react-router-dom"
import LoginPage from './pages/Login'
import ErrorPage from './pages/Error'
import RootPage from './pages/Root'
import DashboardPage from './pages/Dashboard'
import { ProtectedRoute } from "./pages/Protected"
import { useEffect, useState } from "react"
import { useAuth } from "./context/AuthContext"
import { client } from "./utils/axios"
import SubscriptionsPage from "./pages/Subscriptions"
import InvestmentsPage from "./pages/Investments"
import SettingsPage from "./pages/Settings"
import HomePage from "./pages/Home"
import CalendarPage from "./pages/Calendar"
import ProfilePage from "./pages/Profile"

function App() {
    const { login } = useAuth();
    const [isRefreshingSession, setIsRefreshingSession] = useState(true);

    const router = createBrowserRouter([
        {"path":"/login", element: <LoginPage/>,errorElement: <ErrorPage/>},
        {"path": "/", element: <ProtectedRoute/>, errorElement: <ErrorPage/>, children:[
            {element: <RootPage/>, children:[
                {index: true, element: <DashboardPage/>},
                {"path": "/home", element: <HomePage/>},
                {"path": "/investments", element: <InvestmentsPage/>},
                {"path": "/subscriptions", element: <SubscriptionsPage/>},
                {"path": "/calendar", element: <CalendarPage/>},
                {"path": "/profile", element: <ProfilePage/>},
                {"path": "/settings", element: <SettingsPage/>},
            ]}
        ]}
    ])


    const refreshSession = async() => {
        try {
            const response = await client.get("auth/me");
            const {id, username} = response.data;
            console.log(id, username);
            login({id, username});
            
        } catch (error) {
            console.error("Session refresh failed:", error);
        } finally{
            setIsRefreshingSession(false);
        }
    }

    useEffect(() => {
        refreshSession();
    },[])

    if (isRefreshingSession) {
        return(
            <div>Loading...</div>
        )
    }

    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
