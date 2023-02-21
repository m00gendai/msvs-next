import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'
import { useState } from "react"
import Header from "../components/header"
import s from "../styles/Gallery.module.css"
import getFile from "../functions/getFile"
import HightlightOffIcon from '@mui/icons-material/HighlightOff';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function Bilder(
  {
    images
  }
){

  const router = useRouter()
    const headUrl = `https://msvs.ch${router.pathname}`

    const [isVisible, setVisible] = useState(false)
    const [lightImage, setLightImage] = useState(null)
    const [expand, setExpand] = useState(null)

    function closeLight(e){
      if(e.target.tagName == "svg"){
        setVisible(!isVisible)
        setLightImage(null)
      } else if(e.target.className.includes("veil")){
        setVisible(!isVisible)
        setLightImage(null)
      }
    }

    function openSesame(e, id){
      if(e.target.className.includes("container") || e.target.tagName == "H3"){
        if(expand == null){
          setExpand(id)
        } else {
          setExpand(null)
        }
      }
    }

    return(
        <>
     <Header title={"MSVS - Bilder"} content={"MSVS Bildergalerie"} url={headUrl} />
     {
      isVisible ?
        <div className={s.veil} onClick={(e)=>closeLight(e)}>
          <HightlightOffIcon className={s.close} onClick={(e)=>closeLight(e)} sx={{color: "white", fontSize: "2.5rem"}}/>
          <img className={s.lightImage} src={`data:image;base64, ${lightImage.string}`} key={`imageItem_${lightImage.id}`} />
        </div>
      :
      null
     }
        <main>
        <section className={s.section}>
          <h2>Bilder</h2> 
          {
            images.map(item =>{
              if(item.type == "dir"){
                return(
                  <div className={s.container} onClick={(e)=>openSesame(e, item.id)} key={`container_${item.name}`}>
                    <h3>{item.name}</h3>
                    {
                      expand == item.id ?
                      <div className={s.inner}>
                      {
                        images.map(img =>{
                          if(img.type == "file" && img.parent == item.id){
                            return(
                              <div className={s.thumb} key={`image_${img.id}`}
                              style ={{
                                backgroundImage: `url("data:image;base64, ${img.string}")`
                              }}
                              onClick={()=> {setVisible(!isVisible), setLightImage(img)}}>
                              </div>
                            )
                          }
                        })
                      }
                      </div>
                      : null
                    }
                  </div>
                )
              }
            })
          }
          <Link className="archiv" href={`https://kdrive.infomaniak.com/app/share/608492/706273c5-d6e6-4aec-81f7-e0f4d865aca3`} target={`_blank`} ><h3>Archiv</h3></Link>
        </section>
        </main>

    </>
    )
}

export async function getStaticProps() {

    // Gets all folders and files in the /Bilder directory recursively, sorted by last modified
    const getSourceDirectoryList = await fetch("https://api.infomaniak.com/2/drive/608492/files/search?directory_id=16007&depth=unlimited&per_page=1000", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },

    })
    const sourceDirectoryList = await getSourceDirectoryList.json()

    // Gets preview Image object for each image file
    const images = await Promise.all(sourceDirectoryList.data.map(async image =>{
        let getImg = await fetch(`https://api.infomaniak.com/2/drive/608492/files/${image.id}/preview`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.KDRIVE}`,
                "Content-Type" : "application/json"
            },
        })
        // Magic by https://stackoverflow.com/questions/72036447/createobjecturl-error-argument-must-be-an-instance-of-blob-received-an-instan
        getImg = await getImg.arrayBuffer()
        const img = Buffer.from(getImg).toString("base64")
        return {name: image.name, type: image.type, id: image.id, parent: image.parent_id, string: img}  
    }))

    return { 
        props: {
            images
        } , 
            revalidate: 2
    }
}