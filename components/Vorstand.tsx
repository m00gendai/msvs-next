import { Card, Inset } from "@radix-ui/themes"
import { Board } from "../interfaces"
import s from "../styles/Vorstand.module.css"
import revalidate from "../app/actions/revalidate"
import Vorstand_Info from "./Vorstand_Info"

async function getContent(){
    const getContent:Response = await fetch(`https://cms.msvs.ch/api/content/items/board`, {
        method: "GET",
        headers: {
            "api-key": process.env.CMS!
        },
        next:{
            tags: ["board"]
        }
    })
    const content:Board[] = await getContent.json()
    return content
}

export default async function Vorstand(){
    revalidate("board")
    const content:Board[] = await getContent()

    return(
        <>
        <h4>&nbsp;</h4>
        <div className={s.container}>
            {content.map(member=>{
                return (
                    <Card className={s.item} key={member._id}>
                        <Inset side="top" clip="padding-box" className={s.header}>
                            <div className={s.title}>{member.position}</div>

                            
                        </Inset>
                        <Vorstand_Info member={member} />
                    </Card>
                )
            })}
        </div>
        </>
    )
}