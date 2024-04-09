import Link from "next/link";
import extensionTrimmer from "../functions/extensionTrimmer";
import { File, GetFileResponse } from "../interfaces";
import s from "../styles/Page.module.css"

interface Props{
    item: File
}

async function getFile(id:number){
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

    function fileRenamer(name){
        // Assumes that the files are always (more or less) named the same across years. Fallback is original filename
        if(name.includes("Kat S")){
          return "Sportgewehr"
        } else if(name.includes("57-03")){
          return "Stgw 57/03"
        } else if(name.includes("Übr")){
          return "Übrige"
        } else if(name.includes("U21")){
          return "Gewehr U21"
        } else if(name.includes("P25")){
          return "Pistole 25m"
        } else if(name.includes("P50")){
          return "Pistole 50m"
        } else {
          return name.replaceAll("_", " ").replaceAll(".pdf", "")
        }
      }

export default async function Result_Button({item}:Props){

    const path:string = await getFile(item.id)

    return(
        <Link className={s.item} href={path} target="_blank">
            <p>{fileRenamer(item.name)}</p>
        </Link>
    )
}