import Link from "next/link"
import s from "../../styles/Links.module.css"

import Image from "next/image"
import { LinkData } from "../../interfaces"

async function getLinks(){
    const getContent:Response = await fetch(`https://cms.msvs.ch/api/content/items/links`, {
        method: "GET",
        headers: {
            "api-key": process.env.CMS!
        }
    })
    const content:LinkData[] = await getContent.json()
    return content
}

export default async function Links(){

    const links:LinkData[] = await getLinks()
    const categories:string[] = links.map(link => link.category)

    return(
        <main>
            <section className="section">
                <h2>{`Links`}</h2>
          {
            categories.map(category =>{
              return (
                <div className={s.container} key={`container_${category}`}>
                  <h3>{category}</h3>
                  <div className={s.inner}>
                    {links.map(link =>{
                        if(link.category === category){
                            return (
                                <Link className={s.item} href={link.url} target={"_blank"} key={`item_${link.name}`}>
                                    <div className={s.itemInner}>
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_STORAGE}${link.image.path}`}
                                            alt={link.name}
                                            fill={true}
                                            style={{objectFit: "contain"}}
                                        />
                                    </div>
                                    <div className={s.itemName}>{link.name}</div>
                                </Link>
                            )
                        }
                    })}
                  </div>
                </div>
              )
            })
          }
        </section>
        </main>
    )
}