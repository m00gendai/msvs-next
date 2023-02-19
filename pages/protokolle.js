import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'
import Header from "../components/header"
import s from "../styles/Protokolle.module.css"
import getFile from "../functions/getFile"

export default function Protokolle({
  sourceDirectoryList
}){

  console.log(sourceDirectoryList)

    const date = new Date()
    const currentYear = 2022 // date.getFullYear()

    const router = useRouter()
    const headUrl = `https://msvs.ch${router.pathname}`

    const results = sourceDirectoryList.data.sort((a,b) =>{
        const x = a.added_at
        const y = b.added_at
        return x < y ? 1 : x > y ? -1 : 0
    })

    return(
        <>
      <Header title={"MSVS - Protokolle"} content={"MSVS - Protokolle"} url={headUrl} />
        <main>
        <section className={s.section}>
          <h2>Protokolle</h2> 
          <div className={s.results} key={`protokollFragment`}>
                                    <div className={s.container} key={`protokollContainer`}>
          {
                results.map(item =>{
               
                        const name = item.name.replaceAll("_", " ").replace(".pdf", "").replace(".doc", "")
                                                        return (
                                                            <div key={`einladung_${item.id}`} className={s.item} onClick={()=>getFile(item.id)}>
                                                                <div className={s.text}>
                                                                    {name}
                                                                </div>
                                                            </div>
                                                        )
                      
                    
                  
                    
                  
                })
              }
              </div>
                  </div>
        </section>
        </main>

    </>
    )
}

export async function getStaticProps() {

    // Gets all folders and files in the /Resultate directory recursively, sorted by last modified
    const getSourceDirectoryList = await fetch("https://api.infomaniak.com/2/drive/608492/files/search?directory_id=15932&depth=unlimited&per_page=1000", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },

    })
    const sourceDirectoryList = await getSourceDirectoryList.json()

    return { 
        props: {
            sourceDirectoryList
        } , 
            revalidate: 2
    }
}