import {createBrowserRouter, RouterProvider} from "react-router-dom"
import LoginPage from './pages/Login'
import ErrorPage from './pages/Error'
import RootPage from './pages/Root'
import DashboardPage from './pages/Dashboard'

import {action as loginAction} from "./pages/Login"

function App() {

    const router = createBrowserRouter([
        {"path":"/", element: <LoginPage/>, action: loginAction ,errorElement: <ErrorPage/>},
        {"path": "/dashboard", element: <RootPage/>, errorElement: <ErrorPage/>, children:[
            {index: true, element: <DashboardPage/>}
        ]}
    ])

    return (
        <>
            <RouterProvider router={router}/>
        </>
    )
}

export default App
