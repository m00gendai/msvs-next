import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'
import Header from "../components/header"
import s from "../styles/Dokumente.module.css"
import getFile from "../functions/getFile"
import extensionTrimmer from "../functions/extensionTrimmer"


export default function Dokumente({
    setShow,
  sourceDirectoryList
}){


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
      <Header title={"MSVS - Dokumente"} content={"MSVS - Dokumente"} url={headUrl} />
        <main>
        <section className={s.section}>
          <h2>Dokumente</h2> 
          
          {
                results.map(result =>{
                    if(result.type == "dir"){
                        return(
                            <div className={s.results} key={`protokollFragment_${result.name}`}>
                                <h3>{result.name}</h3>
                                <div className={s.container} key={`protokollContainer`}>
                                    {
                                        results.map(item =>{
                                            if(item.type == "file" && item.parent_id == result.id){
                                                
                                                return (
                                                    <div key={`item_${item.id}`} className={s.item} onClick={()=>getFile(item.id, setShow)}>
                                                        <div className={s.text}>
                                                            {extensionTrimmer(item.name)}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }
                        
                })
              }

        </section>
        </main>

    </>
    )
}

export async function getStaticProps() {

    // Gets all folders and files in the /Resultate directory recursively, sorted by last modified
    const getSourceDirectoryList = await fetch("https://api.infomaniak.com/2/drive/608492/files/search?directory_id=16124&depth=unlimited&per_page=1000", {
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