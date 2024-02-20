import {createBrowserRouter, RouterProvider} from "react-router-dom"
import LoginPage from './pages/Login'
import ErrorPage from './pages/Error'
import RootPage from './pages/Root'
import DashboardPage from './pages/Dashboard'

function App() {

    const router = createBrowserRouter([
        {"path":"/", element: <LoginPage/>, errorElement: <ErrorPage/>},
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
