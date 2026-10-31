import Loader from "../public/loader.gif"
import { GetFileResponse, File } from "../interfaces"
import s from "../styles/Page.module.css"
import Image from "next/image"

async function getImage(id:number){
    const getUrl = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/${id}/temporary_url`,{
        method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.KDRIVE}`,
                "Content-Type" : "application/json",
            },
            next: { revalidate: 600 }
        })
        const url:GetFileResponse = await getUrl.json()
        console.log(id)
        if(url.result === "error"){
            return `${process.env.ARCHIVE}`
        }
        return url.data.temporary_url 
    }

interface Props{
    file: File
}

export default async function Result_Image({file}:Props){
    const path:string = await getImage(file.id)

    return(
        
            <div className={s.imageItem} key={`image_${file.id}`}>
                <div className={s.loader}>
                    <Image src={Loader} alt="Bild laden"/>
                    <p>{`Lädt Bild...`}</p>
                </div>
                <Image 
                    src={`/api/file/${file.id}`}
                    alt={"Bild"}
                    fill={true}
                    style={{objectFit: "contain"}}
                />
            </div>
        
    )
}