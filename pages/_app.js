import '../styles/globals.css'
import Navbar from "../components/Navbar"
import Navbar_Mobile from "../components/navbar_mobile"
import Footer from "../components/Footer"
import { useMediaQuery } from '@react-hook/media-query'
import { useState } from "react"
import Spinner from "../components/Spinner"

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
    </>
  ) 
}
