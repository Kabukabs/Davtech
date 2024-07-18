import { Outlet } from "react-router-dom";
import { NavBar } from "../Navbar/navbar";
import { Footer } from "../footer/Footer";
export const PageLayout =()=>{
    return(
        <div className="max-w-[1540px] m-auto">
            <NavBar/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}