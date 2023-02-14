import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'
import Header from "../components/header"
import s from "../styles/KC.module.css"
import getFile from "../functions/getFile"

export default function Kantonalcup(
    {
        sourceDirectoryList
    }
    ){

    const date = new Date()
    const currentYear = 2022 // date.getFullYear()

    const router = useRouter()
    const headUrl = `https://msvs.ch${router.pathname}`

    const results = sourceDirectoryList.data.sort((a,b) =>{
        const x = a.added_at
        const y = b.added_at
        return x < y ? 1 : x > y ? -1 : 0
    })

    const currentYearDirs = results.filter(result =>{ // This filters for all directories of the current year
        return result.name == currentYear.toString()
    })

    const currentYearDirIds = currentYearDirs.map(item=>{ // this extracts the parent_id of the current year directories
        return item.parent_id
    })

    return(
        <>
        <Header title={"MSVS - Kantonalcup Schaffhausen"} content={"Schaffhauser Kantonalcup"} url={headUrl} />
        <main>
            <section className={s.section}>
                <h2>Kantonalcup</h2> 
                <h3>{`Dokumente ${currentYear}`}</h3>
                {
                    results.map(result =>{
                      if(result.type == "dir" && result.name == currentYear.toString()){ 
                        /* If directory AND the directory name is not a number AND there is a subdirectory with the name of the current 
                            year present (see parent_id filtering above) */
                            return (
                                <div className={s.results} key={`einladungFragment_${result.id}`}>
                                    <div className={s.container} key={`einladungContainer_${result.id}`}>
                                    {
                                        results.map(result2 =>{
                                          if(result2.type == "dir" && result2.name == "Dokumente"){
                                                return results.map(result3 =>{
                                                    if(result3.type == "file" && result3.parent_id == result2.id){
                                                        const name = result3.name.replaceAll("_", " ").replace(".pdf", "").replace(".doc", "")
                                                        return (
                                                            <div key={`einladung_${result3.id}`} className={s.item} onClick={()=>getFile(result3.id)}>
                                                                <div className={s.text}>
                                                                    {name}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                        })
                                    }
                                    </div>
                                </div>
                            )
                        }
                    })
                }
                <h3>{`Resultate ${currentYear}`}</h3>
                {
                  results.map(result =>{
                    if(result.type == "dir" && result.name == currentYear.toString()){ 
                      return results.map(result2 =>{
                        if(result2.type == "dir" && result2.name == "Kombinationen" && result2.parent_id == result.id){
                          return results.map(result3 =>{
                            if(result3.type == "dir" && result3.name == "Runde 1" && result3.parent_id == result2.id){
                              return (
                                <div className={s.results} key={`einladungFragment_${result.id}`}>
                                  <div className={s.container} key={`einladungContainer_${result.id}`}>
                                  { 
                                    results.map(result4 =>{
                                      if(result4.type == "file" && result4.parent_id == result3.id){
                                        const name = result4.name.replaceAll("_", " ").replace(".pdf", "").replace(".doc", "")
                                        return (
                                          <div key={`kombi1_${result4.id}`} className={s.item} onClick={()=>getFile(result4.id)}>
                                            <div className={s.text}>
                                              {name}
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
                      })
                    }
                  })
                }
                <Link className="archiv" href={`https://kdrive.infomaniak.com/app/share/608492/7d5ad3ba-c137-4d02-b7ca-7bd9664817c7`} target={`_blank`} ><h3>Archiv</h3></Link>
            </section>
        </main>
        </>
    )
}

export async function getStaticProps() {

    // Gets all folders and files in the /Pistole directory recursively, sorted by last modified
    const getSourceDirectoryList = await fetch("https://api.infomaniak.com/2/drive/608492/files/search?directory_id=15647&depth=unlimited&per_page=1000", {
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