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

export default async function Invitation_Button({item}:Props){

    const path:string = await getFile(item.id)

    return(
        <Link className={s.item} href={path} target="_blank">
            <p>{extensionTrimmer(item.name)}</p>
        </Link>
    )
}