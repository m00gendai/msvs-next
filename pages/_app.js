import '../styles/globals.css'
import Nav from "../components/MainNavMenu"

export default function App({ Component, pageProps }) {
  return(
    <>
    <Nav />
      
        
    <Component {...pageProps} />

    </>
  ) 
}
