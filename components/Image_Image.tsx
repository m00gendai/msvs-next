"use client"

import Image from "next/image"
import s from "../styles/Image_Folder.module.css"
import d from "../styles/Lightbox.module.css"
import { useState } from "react"
import { SlArrowLeft, SlArrowRight, SlClose } from "react-icons/sl"
import Loader from "../public/loader.gif"

interface Props{
    images: {id: number, parent:number, base64: string}[]
    index: number
}

export default function Image_Image({images, index}:Props){

    const totalIndex = images.length-1

    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [visible, setVisible] = useState<boolean>(false)

    function handleClick(indx:number){
        setCurrentIndex(indx)
        setVisible(true)
    }

    function previous(){
        const index = currentIndex-1 < 0 ? totalIndex : currentIndex-1
        setCurrentIndex(index)
    }

    function next(){
        const index = currentIndex+1 > totalIndex ? 0 : currentIndex+1
        setCurrentIndex(index)
    }

    function close(){
        setVisible(false)
    }

    return(
        <>
        {visible ? 
        <div className={d.veil}>
            <div className={`${d.controls} ${d.prev}`} onClick={()=>previous()}><SlArrowLeft /></div>
                <div className={`${d.controls} ${d.next}`} onClick={()=>next()}><SlArrowRight /></div>
                <div className={`${d.controls} ${d.close}`} onClick={()=>close()}><SlClose /></div>
            <div className={d.inner}>
                <Image 
                    src={`${images[currentIndex].base64}`}
                    alt={""}
                    fill={true}
                    style={{objectFit: "contain"}}
                />
            </div>
        </div> : null}
        <div className={s.image}>
        <div className={s.loader}>
                    <Image src={Loader} alt="Bild laden"/>
                    <p>{`Lädt Bild...`}</p>
                </div>
            <Image 
                src={`${images[index].base64}`}
                alt={""}
                fill={true}
                style={{objectFit: "cover"}}
                onClick={()=>handleClick(index)}
            />
        </div>
        </>
        
    )
}