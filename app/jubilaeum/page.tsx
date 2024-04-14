import React from "react"
import Cup_Result_Button from "../../components/Cup_Result_Button"
import Document_Container from "../../components/Document_Container"
import { CMS_Page, FileResponse } from "../../interfaces"
import s from "../../styles/Page.module.css"
import revalidate from "../actions/revalidate"

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
        next: {
            tags: ["jubiFiles"]
          }
    })

    const files:FileResponse = await getFiles.json()
    return files
}

export default async function Page(){
    revalidate("jubiFiles")
    const content:CMS_Page[] = await getContent()
    const directories:FileResponse = await getDirectories()

    return(
        <main>
            <section className={s.section}>
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
                                    console.log(files)
                                    return <Document_Container key={directory.id} name={item.title} files={files.data}/>
                                }
                            }) : null}
                            </React.Fragment>
                        )
                    })
                }
            </section>
        </main>
    )
}