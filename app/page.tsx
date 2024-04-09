import Image from "next/image"
import Link from "next/link"
import s from '../styles/Home.module.css'
import Jubi from "../public/Jubi2.png"
import Logo from "../public/logo.gif"
import News from "../components/News"
import { FileResponse, GetFileResponse } from "../interfaces"

async function getJoinFile(){
    const getFile = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/${process.env.KDRIVE_JOIN}/files`, {
      method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },
    })

    const file:FileResponse = await getFile.json()
    return file
}

async function getFilePath(id:number){
    const getUrl = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/${id}/temporary_url`,{
        method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.KDRIVE}`,
                "Content-Type" : "application/json",
            },
        })
        const url:GetFileResponse = await getUrl.json()
        
        if(url.result === "error"){
            return `${process.env.ARCHIVE}`
        }
        return url.data.temporary_url 
    }


export default async function Home() {

    const thatFile:FileResponse = await getJoinFile()
    const path:string = await getFilePath(thatFile.data[0].id)
  
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
              <Link href={path} className={s.button}>Mitglied werden</Link>
              <Link href="/jubilaeum" className={s.buttonLong}>Jubiläum</Link>
            </div>
        </section>
        <section className={s.news}>
            <News />
        </section>
        </main>

    </>
  )
}