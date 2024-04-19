import React from "react"
import Navbar from "../components/Navbar"
import Navbar_Mobile from "../components/Navbar_mobile"
import Footer from "../components/Footer"
import "../styles/globals.css"
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';


export default function RootLayout({

  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>
        <Theme>
      <Navbar_Mobile />
        <Navbar />
        {children}
        <Footer />
        </Theme>
        </body>
   
    </html>
  )
}