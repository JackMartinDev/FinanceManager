import { Outlet } from "react-router"
import Navbar from "../components/Navbar/Navbar"

const RootPage = ():JSX.Element =>{
    return(
    <>
        <Navbar/>
        <Outlet/>
    </>
    )
}

export default RootPage
