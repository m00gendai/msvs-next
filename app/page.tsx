import Image from "next/image"
import Link from "next/link"
import s from '../styles/Home.module.css'
import MSVSP from "../public/MSVSP.jpg"
import MSVSG from "../public/MSVSG.jpg"
import Logo from "../public/logo.gif"
import News from "../components/News"
import { FileResponse, GetFileResponse, Medium, SpecialHeroImage } from "../interfaces"
import { getPageMetadata } from "../functions/getPageMetadata"
import { Suspense } from "react"
import Loader_News from "../components/Loader_News"

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

async function getSpecialHeroImage(date:number){
    const getUrl = await fetch(`https://cms.msvs.ch/api/content/items/specialHero`)
    const fileResponse = await getUrl.json()

    console.log(fileResponse)
    if(fileResponse.length != 0){
        const file:SpecialHeroImage = fileResponse[0]
        const from:number = new Date(file.validityFrom).getTime()
        const to:number = new Date(file.validityUntil).getTime()
        if(date >= from && date <= to){
            return file
        } else {
            return null
        }
    } else {
        return null
    }
}

export async function generateMetadata(){
    return getPageMetadata("Home")
}

export default async function Home() {

    const thatFile:FileResponse = await getJoinFile()
    const path:string = await getFilePath(thatFile.data[0].id)
    const specialHeroImage:SpecialHeroImage | null = await getSpecialHeroImage(new Date().getTime())
console.log(specialHeroImage)
  
    return (
    <>
        <h1 className="desktop"><div className={s.logo}><Image src={Logo} alt="MSVS Logo" fill /></div>Matchschützenvereinigung Schaffhausen</h1>
        <main>
        <section className={s.section}>
          <h2>Home</h2> 
          <Link className={s.image} style={{backgroundColor: `${specialHeroImage ? "black" : "yellow"}`}} href={specialHeroImage ? `/${specialHeroImage.link}` : "/"}>
          <Image src={specialHeroImage ? `https://cms.msvs.ch/storage/uploads${specialHeroImage.heroImage.path}` : Math.floor(Math.random() * 100)%2 === 0 ? MSVSG : MSVSP} fill={true} style={{objectFit: specialHeroImage ? "contain" : "cover"}} alt="Introbilder" priority/>   
          </Link>        
            <div className={s.container}>
              <Link href="/kantonalcup" className={s.button}>Kantonalcup</Link>
              <Link href="/jubilaeum" className={s.button}>Jubiläumsbuch</Link>
              <Link href={path} className={s.button}>Mitglied werden</Link>
            </div>
        </section>
        <section className={s.news}>
            <Suspense fallback={<Loader_News />}>
            <News />
            </Suspense>
        </section>
        </main>

    </>
  )
}
