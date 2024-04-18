"use client"

import { useState } from "react"
import Link from "next/link"
import s from "../styles/navbar_mobile.module.css"
import React from "react";
import { SlClose, SlMenu } from "react-icons/sl";

export default function Navbar_Mobile(){

    const [visible, setVisible] = useState<boolean>(false) // checks if submenu is visible

    function handleMenu(){
        setVisible(!visible)
    }

    return(
        <nav className ={s.nav}> 
            <div className={s.homeLink}>
                <Link className={s.homeLinkLogo} href="/">
                </Link>MSVS
            </div>
    
            <div className={s.menu} onClick={()=>handleMenu()}>
                {
                visible ?
                    <SlClose style={{
                        color: "white",
                        fontSize: "5vh"
                    }}/>
                :
                    <SlMenu style={{
                        color: "white",
                        fontSize: "5vh"
                    }}/>
                }
            </div>
            {
            visible ?
                <div className={s.linkContainer}>
                    <Link className={s.link} onClick={()=>handleMenu()} href="/">Home</Link>
                    <Link className={s.link} onClick={()=>handleMenu()} href="/gewehr">Gewehr</Link>
                    <Link className={s.link} onClick={()=>handleMenu()} href="/pistole">Pistole</Link>
                    <Link className={s.link} onClick={()=>handleMenu()} href="/luft">Luft</Link>
                    <Link className={s.link} onClick={()=>handleMenu()} href="/kantonalcup">Kantonalcup</Link>
                    <div className={s.link} >die MSVS</div>
                    <div className={s.subLinkContainer} >
                        <Link className={s.link} onClick={()=>handleMenu()} href="/vorstand">Vorstand</Link>
                        <Link className={s.link} onClick={()=>handleMenu()} href="/jubilaeum">Jubiläum</Link>
                        <Link className={s.link} onClick={()=>handleMenu()} href="/bilder">Bilder</Link>
                        <Link className={s.link} onClick={()=>handleMenu()} href="/dokumente">Dokumente</Link>
                    </div>
                    <Link className={s.link} onClick={()=>handleMenu()} href="/links">Links</Link>
                </div>
            : 
                null
            }
        </nav>
    )
}