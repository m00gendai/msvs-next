import Loader from "../public/loader.gif"
import { GetFileResponse, File } from "../interfaces"
import s from "../styles/Page.module.css"
import Image from "next/image"


interface Props{
    file: File
}

export default async function Result_Image({file}:Props){

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
                    unoptimized
                />
            </div>
        
    )
}