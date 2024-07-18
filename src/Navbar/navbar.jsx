import './Navbar.css';
import { AppLogo } from "../components/common/logo"
import {NavLink} from "react-router-dom";
import { Pageroutes } from "../lib/constants/routes";
import { useRef } from "react";
import Hamburger from 'hamburger-react';

export const NavBar =()=>{
    const navRef = useRef(null);
    return(
        <nav className="flex md:flex-row flex-col md:items-center items-start md:gap-[5rem] gap-8 m-auto md:px-[2rem] md:py-[1rem] py-[0.5rem] px-[1rem] border-b-4 border-b-[ghostwhite] navBg">
            <div className ="md:w-fit w-full flex justify-between items-center">
                <AppLogo/>
                <div className="md:hidden block">
                    <Hamburger
                        onToggle={() => navRef.current !==null && navRef.current.classList.toggle("active")} 
                        color="black"
                        easing="ease-in"
                        size={20}
                    />
                </div>
            </div>
            <ul ref={navRef} className="navRef md:flex-row flex-col md:items-center items-start bg-surfaceWhite md:bg-white p-4 rounded gap-4 justify-between lg:w-[45%] w-full">
                {
                    Pageroutes.map((route,index)=>(
                        <li key={index}>
                            <NavLink to={route.route} className={({isActive})=>isActive?"text-blue underline font-semibold text-[15px]":"text-darkgrey font-semibold text-none text-[15px]"}>{route.title}</NavLink>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}