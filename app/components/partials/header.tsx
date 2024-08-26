'use client'

import Link from "next/link";
import { LogoIcon, MenuIcon } from "../icons";
import { IconButton, TextButton } from "../utils";
import { MdFace, MdNotifications, MdOutlineInsertChart, MdOutlineWarehouse, MdShoppingCart } from "react-icons/md";
import { signOut } from "next-auth/react";
import { SearchBar } from "../helpers";

const Header = (
    { isAuth=false, isLoggedIn=true, username, isAdmin=false }:
    { isAuth:boolean, isLoggedIn:boolean, username?:string, isAdmin:boolean }
)=>{
    return <header className="bg-navy-blue py-8 px-10 flex justify-between items-center">
        <div className={`flex ${!isAuth?"flex-grow justify-around":"justify-start"} items-center gap-8`}>
            <LogoIcon/>
            { !isAuth &&  
                <> { isLoggedIn && isAdmin // admin login 
                  ? <div className="flex items-center gap-2">
                        {/* Dashboard Menu */}
                        <MenuIcon link='#' Icon={MdOutlineInsertChart}/>
                        {/* Stocks Menu */}
                        <MenuIcon link='#' Icon={MdOutlineWarehouse}/>
                    </div>
                  : <div className="flex flex-grow items-center gap-2">
                        <SearchBar/>
                        <MenuIcon link='/cart' Icon={MdShoppingCart}/>
                        { isLoggedIn && <MenuIcon link="#" Icon={MdNotifications}/> }
                    </div>
                }
                </> // display search bar and icons if not login page
            }
        </div>
        { !isAuth && // display if not login/register page
        <div className="ml-8 flex justify-between items-center gap-5">
            { isLoggedIn
                ? <>
                    <IconButton Icon={MdFace} text={username??"Jane Doe"} theme="primary"/> 
                    <TextButton text="Logout" theme='secondary' onClick={()=>signOut({callbackUrl:'/'})}/>
                    {/* display IconButton to view profile */}
                </>
                : <>
                    <Link href="/login">
                        <TextButton text="Login" theme='secondary'/>
                    </Link>
                    <Link href="/register">
                        <TextButton text="Register"/>
                    </Link>
                </>
                // display Register and Login Button
            }
        </div> }
    </header>
}

export default Header;