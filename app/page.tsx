import Header from '../components/header'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'
import s from '../styles/Home.module.css'
import Gruppenfoto from "../public/Gruppenfoto.jpg"
import Jubi from "../public/Jubi2.png"
import Logo from "../public/logo.gif"
import News from "../components/News"
import { useMediaQuery } from '@react-hook/media-query'
import getFile from '../functions/getFile'

async function getJoinFile(){
    const getFile = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/${process.env.KDRIVE_JOIN}/files`, {
      method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },
    })

    return await getFile.json()
}


export default async function Home() {

    const thatFile = await getJoinFile()

  return (
    <>
        <h1 className="desktop"><div className={s.logo}><Image src={Logo} alt="MSVS Logo" fill /></div>Matchschützenvereinigung Schaffhausen</h1>
        <main>
        <section className={s.section}>
          <h2>Home</h2> 
          <Link className={s.image} href="/jubilaeum">
          <Image src={Jubi} fill={true} style={{objectFit: "contain"}} alt="Gruppenbild MSVS" priority/>   
          </Link>        
            <div className={s.container}>
              <Link href="/kantonalcup" className={s.button}>Kantonalcup</Link>
              <Link href= "/" className={s.button}>Mitglied werden</Link>
              <Link href="/jubilaeum" className={s.buttonLong}>Jubiläum</Link>
            </div>
        </section>
        <section className={s.news}>
         {/* <News setShow={setShow} items={latestFiles}/> */}
        </section>
        </main>

    </>
  )
}

/*
    // Gets all folders and files in the /Resultate directory recursively, sorted by last modified
    const getSourceDirectoryList = await fetch(`https://api.infomaniak.com/2/drive/608492/files/search?directory_id=15646&depth=unlimited&order_by=added_at&order=desc&types[]=pdf&types[]=spreadsheet&types[]=text&per_page=12`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },

    })
    const sourceDirectoryList = await getSourceDirectoryList.json()

    const getThatFile = await fetch(`https://api.infomaniak.com/2/drive/608492/files/16125/files`, {
      method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },
    })

    const thatFile = await getThatFile.json()

    return { 
        props: {
            sourceDirectoryList,
            thatFile
        } , 
            revalidate: 2
    }
}
*/