import { useState, useEffect } from "react"
import Link from "next/link"
import s from "../styles/Navbar.module.css"

export default function Navbar(){

    const [overTrigger, setOverTrigger] = useState(false) // checks if cursor is over trigger link
    const [visible, setVisible] = useState(false) // checks if submenu is visible

    function handleSubMenuTrigger(e){
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
                <Link className={s.link} href="/resultate">LG & Lupi</Link>
                <Link className={s.link} href="/resultate">Kantonalcup</Link>
                <div className={s.surLinkContainer} onMouseEnter={(e)=>handleSubMenuTrigger(e)} onMouseLeave={(e)=>handleSubMenuTrigger(e)}>
                    <div className={s.link} >Die MSVS</div>
                    {visible?
                    <div className={s.subLinkContainer} >
                        <Link className={s.sublink} href="/schiessen/schwabenkrieg-erinnerungsschiessen">Jubiläum</Link>
                        <Link className={s.sublink} href="/schiessen/obligatorisches">Vorstand</Link>
                        <Link className={s.sublink} href="/schiessen/feldschiessen">Bilder</Link>
                        <Link className={s.sublink} href="/schiessen/hilfsmittel">Protokolle</Link>
                    </div>
                    : null}
                </div>
                <Link className={s.link} href="/links">Links</Link>
            </div>
        </nav>
    )
}