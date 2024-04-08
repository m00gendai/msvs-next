import React from "react"
import Navbar from "../components/Navbar"
import Navbar_Mobile from "../components/Navbar_mobile"
import Footer from "../components/Footer"
import "../styles/globals.css"


export default function RootLayout({

  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>
      <Navbar_Mobile />
        <Navbar />
        {children}
        <Footer />
        </body>
   
    </html>
  )
}