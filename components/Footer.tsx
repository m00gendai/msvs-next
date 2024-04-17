import Link from "next/link"
import s from "../styles/Footer.module.css"
import React from "react"

export default function Footer(){

    const date = new Date()
    const currentYear = date.getFullYear()

    return(
        <>
        <footer className={`${s.footer} mobile`}>

                    <p>
                        ©{currentYear.toString() == "2023" ? "2023" : `2023 - ${currentYear}`} Matchschützenvereinigung Schaffhausen
                    </p>
                    <div className={s.linkContainer}>
                        <Link className={s.link} href="/impressum">Impressum</Link>
                        <Link className={s.link} href="/datenschutz">Datenschutz</Link>
                    </div>
                </footer>
                
                <footer className={`${s.footer} desktop`}>
                    <Link className={s.link} href="/impressum">Impressum</Link>
                    <p>
                        ©{currentYear.toString() == "2023" ? "2023" : `2023 - ${currentYear}`} Matchschützenvereinigung Schaffhausen
                    </p>
                    <Link className={s.link} href="/datenschutz">Datenschutz</Link>
                </footer>
</>
    )
}