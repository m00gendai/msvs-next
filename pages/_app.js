import '../styles/globals.css'
import Navbar from "../components/MainNavMenu"

export default function App({ Component, pageProps }) {
  return(
    <>
    <Navbar />
      
        
    <Component {...pageProps} />

    </>
  ) 
}
