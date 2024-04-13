import Image from "next/image"
import s from "../styles/Image_Folder.module.css"

async function getImage(id:number){
    const getImg = await fetch(`https://api.infomaniak.com/2/drive/608492/files/${id}/preview`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },
    })
    // Magic by https://stackoverflow.com/questions/72036447/createobjecturl-error-argument-must-be-an-instance-of-blob-received-an-instan
    const imgBuffer = await getImg.arrayBuffer()
    const img = Buffer.from(imgBuffer).toString("base64")
    return img
}


interface Props{
    id: number
}

export default async function Image_Image({id}:Props){

    const src = await getImage(id)

    return(
        <div className={s.image}>
            <Image 
                src={`data:image;base64, ${src}`}
                alt={""}
                fill={true}
                style={{objectFit: "cover"}}
            />
        </div>
    )
}