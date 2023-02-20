import '../styles/globals.css'
import Navbar from "../components/Navbar"
import Navbar_Mobile from "../components/navbar_mobile"
import Footer from "../components/Footer"
import { useMediaQuery } from '@react-hook/media-query'

export default function App({ Component, pageProps }) {

  const isMobile = useMediaQuery('only screen and (max-aspect-ratio: 13/9)')

  return(
    <>
    {isMobile ?
        <Navbar_Mobile />
      :
        <Navbar />
    }
    <Component {...pageProps} />
    <Footer />
    </>
  ) 
}
