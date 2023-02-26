import { useState, useEffect } from "react"
import Link from "next/link"
import s from "../styles/navbar_mobile.module.css"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

export default function Navbar_Mobile(){

    const [overTrigger, setOverTrigger] = useState(false) // checks if cursor is over trigger link
    const [visible, setVisible] = useState(false) // checks if submenu is visible

    function handleSubMenuTrigger(e){
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
            <div className={s.menu} onClick={(e)=>handleSubMenuTrigger(e)}>
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
                    <Link className={s.link} onClick={(e)=>handleSubMenuTrigger(e)} href="/">Home</Link>
                    <Link className={s.link} onClick={(e)=>handleSubMenuTrigger(e)} href="/gewehr">Gewehr</Link>
                    <Link className={s.link} onClick={(e)=>handleSubMenuTrigger(e)} href="/pistole">Pistole</Link>
                    <Link className={s.link} onClick={(e)=>handleSubMenuTrigger(e)} href="/lupi">Lupi</Link>
                    <Link className={s.link} onClick={(e)=>handleSubMenuTrigger(e)} href="/kantonalcup">Kantonalcup</Link>
                    <div className={s.link} >die MSVS</div>
                    <div className={s.subLinkContainer} >
                        <Link className={s.link} onClick={(e)=>handleSubMenuTrigger(e)} href="/vorstand">Vorstand</Link>
                        <Link className={s.link} onClick={(e)=>handleSubMenuTrigger(e)} href="/jubilaeum">Jubiläum</Link>
                        <Link className={s.link} onClick={(e)=>handleSubMenuTrigger(e)} href="/bilder">Bilder</Link>
                        <Link className={s.link} onClick={(e)=>handleSubMenuTrigger(e)} href="/dokumente">Dokumente</Link>
                    </div>
                    <Link className={s.link} onClick={(e)=>handleSubMenuTrigger(e)} href="/links">Links</Link>
                </div>
            : 
                null
            }
        </nav>
    )
}