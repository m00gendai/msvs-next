import Header from '../components/header'
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'
import s from '../styles/Home.module.css'
import Gruppenfoto from "../public/Gruppenfoto.jpg"
import Logo from "../public/logo.gif"
import News from "../components/News"
import { useMediaQuery } from '@react-hook/media-query'
import getFile from '../functions/getFile'


export default function Home({
  setShow,   
        sourceDirectoryList,
        thatFile
    }) {

const isMobile = useMediaQuery('only screen and (max-aspect-ratio: 13/9)')
const router = useRouter()
    const headUrl = `https://msvs.ch${router.pathname}`
  const latestFiles = sourceDirectoryList.data

  return (
    <>
<Header title={"MSVS - Home"} content={"Matchschützenvereinigung Schaffhausen"} url={headUrl} />
      {isMobile ?
        null
        :
        <h1 ><div className={s.logo}><Image src={Logo} alt="MSVS Logo" fill /></div>Matchschützenvereinigung Schaffhausen</h1>
      }
        <main>
        <section className={s.section}>
          <h2>Home</h2> 
          <div className={s.image}>
          <Image src={Gruppenfoto} fill alt="Gruppenbild MSVS" priority/>   
          </div>        
            <div className={s.container}>
              <Link href="/kantonalcup" className={s.button}>Kantonalcup</Link>
              <div className={s.button} onClick={()=>getFile(thatFile.data[0].id, setShow)}>Mitglied werden</div>
              <Link href="/jubilaeum" className={s.buttonLong}>Jubiläum</Link>
            </div>
        </section>
        <section className={s.news}>
          <News setShow={setShow} items={latestFiles}/>
        </section>
        </main>

    </>
  )
}

export async function getStaticProps() {
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
