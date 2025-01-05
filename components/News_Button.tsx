import Link from "next/link";
import extensionTrimmer from "../functions/extensionTrimmer";
import { File, GetFileResponse } from "../interfaces";
import s from "../styles/News.module.css"
import { getNewsType } from "../functions/getNewsType";


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

export default async function NewsButton({item}:Props){

    const path:string = await getFile(item.id)
    const itemType:{type:JSX.Element, document:JSX.Element} = getNewsType(item.path)

    return(
        <Link className={s.item} href={path} target="_blank">
            <div className={s.icons}>{itemType.type} {itemType.document}</div>
            <div className={s.title}>{extensionTrimmer(item.name)}</div>
        </Link>
    )
}