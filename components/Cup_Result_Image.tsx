import { GetFileResponse, File } from "../interfaces"
import s from "../styles/Page.module.css"
import Image from "next/image"

interface Props{
    file: File
}

export default async function Result_Image({file}:Props){
    
    return(
        
            <div className={s.imageItemCup} key={`image_${file.id}`}>
                <Image 
                    src={`/api/file/${file.id}`}
                    alt={"Bild"}
                    fill={true}
                    style={{objectFit: "contain"}}
                />
            </div>
        
    )
}