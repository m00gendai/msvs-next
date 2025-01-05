import Link from "next/link";
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
            cache: 'no-store'
        })
        const url:GetFileResponse = await getUrl.json()
        
        if(url.result === "error"){
            return `${process.env.ARCHIVE}`
        }
        return url.data.temporary_url 
    }

export default async function Document_Button({item}:Props){

    const path:string = await getFile(item.id)

    return(
        <Link className={`${s.item} ${s.documentButton}`} href={path} target="_blank" role="button">
            <p>{item.name}</p>
        </Link>
    )
}