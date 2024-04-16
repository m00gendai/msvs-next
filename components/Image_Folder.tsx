import { FileResponse } from "../interfaces"
import s from "../styles/Image_Folder.module.css"
import Image_Image from "./Image_Image"

async function getImages(id:number){
    const getImages:Response = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/search?directory_id=${process.env.KDRIVE_IMG}&types[]=image&depth=unlimited&per_page=1000`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },

    })

    const images:FileResponse = await getImages.json()
    return images
}

interface Props{
    id: number
    name: string
    index: number
}

export default async function Image_Folder({id, name, index}:Props){

    const images:FileResponse = await getImages(id)

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
                    images.data.map(image=>{
                        if(image.parent_id === id){
                            return <Image_Image key={`image_${image.id}`} id={image.id} />
                        }
                    })
                }
                </div>
            </div>
        </details>
        </>
    )
}