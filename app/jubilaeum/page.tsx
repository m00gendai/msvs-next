import React from "react"
import Document_Container from "../../components/Document_Container"
import { CMS_Page, FileResponse } from "../../interfaces"
import { getPageMetadata } from "../../functions/getPageMetadata"

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

export async function generateMetadata(){
    return getPageMetadata("Jubiläum")
}

export default async function Page(){

    const content:CMS_Page[] = await getContent()

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

                            </React.Fragment>
                        )
                    })
                }
            </section>
        </main>
    )
}