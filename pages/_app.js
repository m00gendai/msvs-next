import '../styles/globals.css'
import Link from "next/link"
import Navbar from "../components/Navbar"
import Navbar_Mobile from "../components/navbar_mobile"
import Footer from "../components/Footer"
import { useMediaQuery } from '@react-hook/media-query'
import { useState } from "react"
import Spinner from "../components/Spinner"
import CookieConsent from "react-cookie-consent";

export default function App({ Component, pageProps }) {

  const isMobile = useMediaQuery('only screen and (max-aspect-ratio: 13/9)')
  const [show, setShow] = useState(false)

  return(
    <>
    {isMobile ?
        <Navbar_Mobile />
      :
        <Navbar />
    }
    {show ? <Spinner /> : null }
    <Component setShow={setShow} {...pageProps} />
    <Footer />
    <CookieConsent
  location="bottom"
  buttonText="Verstanden"
  cookieName="MSVS_Cookie"
  style={{ background: "rgba(0,0,0,1)" }}
  buttonStyle={{ color: "black", fontSize: "13px", background: "yellow"}}
>
  Wir verwenden Cookies. Sie kennen das. Details in der <Link href="/datenschutz">Datenschutzerklärung</Link>
</CookieConsent>
    </>
  ) 
}
