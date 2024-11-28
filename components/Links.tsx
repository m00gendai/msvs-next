import Link from "next/link"
import s from "../styles/Links.module.css"

import Image from "next/image"
import { LinkData } from "../interfaces"
import { Card, Inset } from "@radix-ui/themes"
import React from "react"

async function getLinks(){
    const getContent:Response = await fetch(`https://cms.msvs.ch/api/content/items/links`, {
        method: "GET",
        headers: {
            "api-key": process.env.CMS!
        },
        next: 
            { 
                revalidate: 10 
            } 
    })
    const content:LinkData[] = await getContent.json()
    return content
}

export default async function Links(){

    const links:LinkData[] = await getLinks()
    const categories:string[] = Array.from(new Set(links.map(link => link.category)))

    return(
        <>
        {
            categories.map((category, index) =>{
              return (
                <React.Fragment key={`linkCategory_${index}`}>
                <h3>{category}</h3>
                <div className={s.container} key={`container_${category}`} style={index !== categories.length-1 ? {margin: "0 0 2rem 0"} : {}}>
                  <div className={s.inner}>
                    {links.map(link =>{
                        if(link.category === category){
                            return (
                                <Link className={s.itemLink} href={link.url} target={"_blank"} key={`item_${link.name}`}>
                                    <Card className={s.item}>
                                        <Inset side="top" clip="padding-box" className={s.header}>
                                            <div className={s.itemName}>{link.name}</div>
                                        </Inset>
                                        <div className={s.itemInner}>
                                            <div className={s.image}>
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_STORAGE}${link.image.path}`}
                                                    alt={link.name}
                                                    fill={true}
                                                    style={{objectFit: "contain"}}
                                                />
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            )
                        }
                    })}
                  </div>
                </div>
                </React.Fragment>
              )
            })
          }
        </>
    )
}