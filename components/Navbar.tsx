"use client" 

import { useState, useEffect } from "react"
import Link from "next/link"
import s from "../styles/Navbar.module.css"
import React from "react"

export default function Navbar(){

    const [overTrigger, setOverTrigger] = useState<boolean>(false) // checks if cursor is over trigger link
    const [visible, setVisible] = useState<boolean>(false) // checks if submenu is visible

    function handleSubMenuTrigger(e:React.MouseEvent){
        if(e.type == "mouseenter"){
            setOverTrigger(true)
        } else if(e.type == "mouseleave"){
            setOverTrigger(false)
        }
    }

    useEffect(()=>{
        if(overTrigger){
            setVisible(true)
        }
        if(!overTrigger){
            setVisible(false)
        }
    },[overTrigger])


    return(
        <nav className ={s.nav}>
            <div className={s.linkContainer}>
                <Link className={s.homeLink} href="/"></Link>
                <Link className={s.link} href="/gewehr">Gewehr</Link>
                <Link className={s.link} href="/pistole">Pistole</Link>
                <Link className={s.link} href="/luft">Luft</Link>
                <Link className={s.link} href="/kantonalcup">Kantonalcup</Link>
                <div className={s.surLinkContainer} onMouseEnter={(e:React.MouseEvent)=>handleSubMenuTrigger(e)} onMouseLeave={(e:React.MouseEvent)=>handleSubMenuTrigger(e)}>
                    <div className={s.link} >Die MSVS</div>
                    {visible?
                    <div className={s.subLinkContainer} >
                        <Link className={s.sublink} href="/vorstand">Vorstand</Link>
                        <Link className={s.sublink} href="/jubilaeum">Jubiläum</Link>
                        <Link className={s.sublink} href="/bilder">Bilder</Link>
                        <Link className={s.sublink} href="/dokumente">Dokumente</Link>
                    </div>
                    : null}
                </div>
                <Link className={s.link} href="/links">Links</Link>
            </div>
        </nav>
    )
}