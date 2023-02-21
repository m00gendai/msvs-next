import Link from "next/link"
import { useRouter } from 'next/router'
import Header from "../components/header"
import s from "../styles/Links.module.css"
import { links } from "../lib/links"

export default function Links(){

  const router = useRouter()
    const headUrl = `https://msvs.ch${router.pathname}`

    return(
        <>
      <Header title={"MSVS - Links"} content={"MSVS - Links"} url={headUrl} />
        <main>
        <section className={s.section}>
          <h2>Links</h2> 
          {
            links.map(link =>{
              return (
                <div className={s.container}>
                  <h3>{link.type}</h3>
                  <div className={s.inner}>
                    {link.content.map(content =>{
                      return (
                        <Link className={s.item} href={content.url} target={"_blank"}>
                          <div className={s.itemInner} style={{backgroundImage: `url("${content.img}")`}}>
                            <p>{content.name}</p>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })
          }
        </section>
        </main>

    </>
    )
}