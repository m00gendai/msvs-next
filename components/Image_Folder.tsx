import { FileResponse } from "../interfaces"
import s from "../styles/Image_Folder.module.css"
import Image_Image from "./Image_Image"

async function getImages(id:number){
    const getImages:Response = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/search?directory_id=${id}&types[]=image&depth=unlimited&per_page=1000`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },

    })

    const images:FileResponse = await getImages.json()
    return images
}

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
    name: string
    index: number
}

export default async function Image_Folder({id, name, index}:Props){

    const images:FileResponse = await getImages(id)
    const imagesbase64 = await Promise.all(images.data.map(async image=>{
        const getImg = await getImage(image.id)
        return {id: image.id, parent: image.parent_id, base64: getImg}
    }))

    return(
        <>
        {index === 0 ? <h4>&nbsp;</h4> : null}
        <details className={s.details}>
            <summary className={s.summary}>
                <h2 className={s.title}>
                    {name}
                </h2>
            </summary >
            <div className={s.container}>
                <div className={s.inner}>
                {
                   imagesbase64.map((image, index)=>{

                        if(image.parent === id){
                            return <Image_Image key={`image_${image.id}`} images={imagesbase64} index={index}/>
                        }
                    })
                }
                </div>
            </div>
        </details>
        </>
    )
}