import { Card, Inset } from "@radix-ui/themes"
import { Board } from "../interfaces"
import s from "../styles/Vorstand.module.css"
import { SlEnvolope, SlPhone, SlScreenSmartphone } from "react-icons/sl"
import revalidate from "../app/actions/revalidate"

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
console.log(content)
    return(
        <>
        <h4>&nbsp;</h4>
        <div className={s.container}>
            {content.map(member=>{
                return (
                    <Card className={s.item} key={member._id}>
                        <Inset side="top" clip="padding-box" className={s.header}>
                            <div className={s.title}>{member.position}</div>
                            <div className={s.name}>{member.name}</div>
                        </Inset>
                        <div className={s.info}>
                            <div className={s.address} dangerouslySetInnerHTML={{__html: member.address}}></div>
                            <div className={s.contact}>{member.landline && member.landline.length !== 0 ? <SlPhone /> : null}{member.landline}</div>
                            <div className={s.contact}>{member.mobile && member.mobile.length !== 0 ? <SlScreenSmartphone /> : null}{member.mobile}</div>
                            <div className={s.contact}>{member.mail && member.mail.length !== 0 ? <SlEnvolope /> : null}{member.mail}</div>
                        </div>
                    </Card>
                )
            })}
        </div>
        </>
    )
}