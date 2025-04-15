import React from "react"
import Document_Container from "../../components/Document_Container"
import { CMS_Page, FileResponse } from "../../interfaces"
import { getPageMetadata } from "../../functions/getPageMetadata"
import Image_Folder from "../../components/Image_Folder"
import s from "../../styles/Image_Folder.module.css"

async function getContent(){
    const getContent:Response = await fetch(`https://cms.msvs.ch/api/content/items/page`, {
        method: "GET",
        headers: {
            "api-key": process.env.CMS!
        }
    })
    const content:CMS_Page[] = await getContent.json()
    return content
}

async function getDirectories(){
    const getDirectories:Response = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/search?directory_id=${process.env.KDRIVE_JUBI}&depth=unlimited&per_page=1000&types[]=dir&with=path`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },
    })

    const directories:FileResponse = await getDirectories.json()
    return directories
}

async function getFiles(id:number){
    const getFiles:Response = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/search?directory_id=${id}&depth=unlimited&per_page=1000&types[]=file&with=path`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },

    })

    const files:FileResponse = await getFiles.json()
    return files
}

export async function generateMetadata(){
    return getPageMetadata("Jubiläum")
}

export default async function Page(){

    const content:CMS_Page[] = await getContent()
    const directories:FileResponse = await getDirectories()

    return(
        <main>
            <section className="section">
                <h2>{`50 Jahre Matchschützenvereinigung Schaffhausen`}</h2>
                {
                    content[0].content.chapter.map((item, index)=>{
                        return (
                            <React.Fragment key={`item_${index}`}>
                            <h3>{item.title}</h3>
                            {item.text ? <div className="textContent" dangerouslySetInnerHTML={{__html: item.text}}></div> : null}
                            {directories.data ? directories.data.map(async directory=>{
                                if(directory.name === item.title){
                                    const files:FileResponse = await getFiles(directory.id)
                                    return <Document_Container key={directory.id} name={item.title} files={files.data}/>
                                }
                            }) : null}
                            <div className={s.imageContainer}>
                            {index === 0 ? <Image_Folder key={19258} id={19258} name={"Jubiläumsbuch"} index={0}/> : <Image_Folder key={18575} id={18575} name={"Jubiläum 2024"} index={0}/>}
                            </div>
                            </React.Fragment>
                        )
                    })
                }
            </section>
        </main>
    )
}