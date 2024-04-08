"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import s from "../styles/navbar_mobile.module.css"
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import React from "react";

export default function Navbar_Mobile(){

    const [overTrigger, setOverTrigger] = useState<boolean>(false) // checks if cursor is over trigger link
    const [visible, setVisible] = useState<boolean>(false) // checks if submenu is visible

    function handleSubMenuTrigger(e:React.MouseEvent){
        if(e.type == "mouseenter"){
            setOverTrigger(true)
        } else if(e.type == "mouseleave"){
            setOverTrigger(false)
        } else { // for click events
            setVisible(!visible)
        }
    }

    useEffect(()=>{ // this needs to be a useEffect because if its handled in the handleSubMenuTrigger() it doesn't work reliably
        if(overTrigger){
            setVisible(true)
        }
        if(!overTrigger){
            setVisible(false)
        }
    },[overTrigger])

    return(
        <nav className ={s.nav}> 
        {
            visible ?
                null
            :
                <div className={s.homeLink}><Link className={s.homeLinkLogo} href="/"></Link>MSVS</div>
            }   
            <div className={s.menu} onClick={(e:React.MouseEvent)=>handleSubMenuTrigger(e)}>
                {
                visible ?
                    <LocalDiningIcon sx={{
                        color: "white",
                        fontSize: "5vh"
                    }}/>
                :
                    <LunchDiningIcon sx={{
                        color: "white",
                        fontSize: "5vh"
                    }}/>
                }
            </div>
            {
            visible ?
                <div className={s.linkContainer}>
                    <Link className={s.link} onClick={(e:React.MouseEvent)=>handleSubMenuTrigger(e)} href="/">Home</Link>
                    <Link className={s.link} onClick={(e:React.MouseEvent)=>handleSubMenuTrigger(e)} href="/gewehr">Gewehr</Link>
                    <Link className={s.link} onClick={(e:React.MouseEvent)=>handleSubMenuTrigger(e)} href="/pistole">Pistole</Link>
                    <Link className={s.link} onClick={(e:React.MouseEvent)=>handleSubMenuTrigger(e)} href="/luft">Luft</Link>
                    <Link className={s.link} onClick={(e:React.MouseEvent)=>handleSubMenuTrigger(e)} href="/kantonalcup">Kantonalcup</Link>
                    <div className={s.link} >die MSVS</div>
                    <div className={s.subLinkContainer} >
                        <Link className={s.link} onClick={(e:React.MouseEvent)=>handleSubMenuTrigger(e)} href="/vorstand">Vorstand</Link>
                        <Link className={s.link} onClick={(e:React.MouseEvent)=>handleSubMenuTrigger(e)} href="/jubilaeum">Jubiläum</Link>
                        <Link className={s.link} onClick={(e:React.MouseEvent)=>handleSubMenuTrigger(e)} href="/bilder">Bilder</Link>
                        <Link className={s.link} onClick={(e:React.MouseEvent)=>handleSubMenuTrigger(e)} href="/dokumente">Dokumente</Link>
                    </div>
                    <Link className={s.link} onClick={(e:React.MouseEvent)=>handleSubMenuTrigger(e)} href="/links">Links</Link>
                </div>
            : 
                null
            }
        </nav>
    )
}