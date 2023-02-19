import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'
import Header from "../components/header"
import s from "../styles/KC.module.css"
import getFile from "../functions/getFile"
import { EmojiObjects } from "@mui/icons-material"

export default function Kantonalcup(
    {
        sourceDirectoryList
    }
    ){

    const date = new Date()
    const currentYear = date.getFullYear()

    const router = useRouter()
    const headUrl = `https://msvs.ch${router.pathname}`

    const results = sourceDirectoryList.data.sort((a,b) =>{
        const x = a.added_at
        const y = b.added_at
        return x < y ? 1 : x > y ? -1 : 0
    })

    /* 
    The nature of the Kantonalcup is that of a knockout tournament. This means, that there are several rounds with
    combinations and results. Combo 1, Result 1, Combo 2, Result 2, etc until the finals.
    To make file maintenance as easy and organised as possible, it is stored in the following configuration:
    Kantonalcup
      - Year
        - Dokumente
          - [...files]
        - Resultate
          - Runde 1
            - [...files]
          - Runde 2
            - [...files]
          - Runde 3
            - [...files]
          - Finale
            - [...files]
        - Kombinationen
          - Runde 1
            - [...files]
          - Runde 2
            - [...files]
          - Runde 3
            - [...files]
          - Finale
            - [...files]

    This is fine from a maintenance standpoint but makes automated and scalable rendering on the page challenging, as the 
    combos and results have to be in chronologically descending and alternating order, i.e:

    Resultate Finale
    Kombinationen Finale

    Resultate Runde 3
    Kombinationen Runde 3

    And so on.

    This means that there needs to be quite some data manipulation on the API returned data to efficiently and comfortably render
    the files correctly.
    */

    // First, the directory id of the current year is filtered
    const currentYearDir = results.filter(result =>{
      if(result.type == "dir" && result.name == currentYear.toString()){
        return result
      }
    })

    // Then, the "Kombinationen" directory of the current year is filtered
    const comboDir = results.filter(result =>{
      if(result.type == "dir" && result.name == "Kombinationen" && result.parent_id == currentYearDir[0].id){
        return result
      }
    })

    // THEN, the "Runde 1", "Runde 2" ... directories get filtered. This includes the "Finale" directory.
    const comboDirs = results.filter(result =>{
      if(result.type == "dir" && (result.name.startsWith("Runde") || result.name == "Finale") && result.parent_id == comboDir[0].id){
        return result
      } 
    })

    // And this grabs the files (if there are any) from these individual rounds directories and puts in in an object array.
    // For the sake of sorting, "Finale" directory is renamed to Round n, where n is based on the number of round subdirectories.
    const combos = comboDirs.map(combo =>{
      const files = results.filter(result =>{
        if(result.type == "file" && result.parent_id == combo.id){
          return result
        }
      })
      return {[`Kombination ${combo.name == "Finale" ? `Runde ${comboDirs.length}` : combo.name}`]: files}
    })

    //Now the whole shebang again, but with "Resultate"
    const resultDir = results.filter(result =>{
      if(result.type == "dir" && result.name == "Resultate" && result.parent_id == currentYearDir[0].id){
        return result
      }
    })

    const resultDirs = results.filter(result =>{
      if(result.type == "dir" && (result.name.startsWith("Runde") || result.name == "Finale") && result.parent_id == resultDir[0].id){
        return result
      } 
    })

    const resultate = resultDirs.map(combo =>{
      const files = results.filter(result =>{
        if(result.type == "file" && result.parent_id == combo.id){
          return result
        }
      })
      return {[`Resultat ${combo.name == "Finale" ? `Runde ${resultDirs.length}` : combo.name}`]: files}
    })

    // After that, both "Kombinationen" and "Resultate" arrays are combined
    const kcArray = [...combos, ...resultate]

    // Then the entries are sorted ascending based on the number of the object key (Kombinationen Runde 1 => 1 and so on). 
    // Meaning the order is Kombinationen Runde 1, Resultate RUnde 1, Kombinationen Runde 2, ...
   const chrono = kcArray.sort((a,b) =>{
        const k = Object.keys(a).toString()
        const l = Object.keys(b).toString()
        const m = k.split(" ")
        const n = l.split(" ")
        const x = m[2]
        const y = n[2]
        return x > y ? 1 : x < y ? -1 : 0
    })

    // And since an ascending sorting would result in Resultate coming before Kombinationen, the whole thing has to be reversed.
    const finalTree = chrono.reverse()
    // This leaves us with an array with the order Resultate n, Kombinationen n, Resultate n-1, ..., Resultate 1, Kombinationen 1.
    
    function fileRenamer(name){
      // Assumes that the files are always (more or less) named the same across years. Fallback is original filename
      if(name.includes("Kat-S")){
        return "Sportgewehr"
      } else if(name.includes("57-03")){
        return "Stgw 57/03"
      } else if(name.includes("Uebr")){
        return "Übrige"
      } else if(name.includes("U21")){
        return "Gewehr U21"
      } else if(name.includes("P25")){
        return "Pistole 25m"
      } else if(name.includes("P50")){
        return "Pistole 50m"
      } else {
        return name.replaceAll("_", " ").replaceAll(".pdf", "")
      }
    }


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
                      return results.map(result2 =>{
                        if(result2.type == "dir" && result2.name == "Dokumente" && result2.parent_id == result.id){
                          return results.map(result3 =>{
                            if(result3.type == "file" && result3.parent_id == result2.id){
                              const name = result3.name.replaceAll("_", " ").replace(".pdf", "").replace(".doc", "")
                              return (
                                <div className={s.results} key={`einladungFragment_${result.id}`}>
                                  <div className={s.container} key={`einladungContainer_${result.id}`}>
                                    <div key={`einladung_${result3.id}`} className={s.item} onClick={()=>getFile(result3.id)}>
                                      <div className={s.text}>
                                        {name}
                                      </div>
                                    </div>
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
                  
                <h3>{`Kombinationen & Resultate ${currentYear}`}</h3>
                {
                  finalTree.map((entry, index) =>{
                    if(Object.values(entry)[0].length > 0){
                      return(
                        <div className={s.results} key={`einladungFragment_${Object.values(entry)}`}>
                          <h4 key={`imageTitle_${index}`}>
                            {Object.keys(entry) == `Kombination Runde ${finalTree.length/2}` ? "Kombination Finale" : 
                            Object.keys(entry) == `Resultat Runde ${finalTree.length/2}` ? "Resultat Finale" :
                            Object.keys(entry)}
                          </h4>
                          <div className={s.container} key={`einladungContainer_${Object.values(entry)}`}>
                            {Object.values(entry)[0].map(item =>{
                              return (
                                <div key={`einladung_${item.id}`} className={s.item} onClick={()=>getFile(item.id)}>
                                    <div className={s.text}>
                                        {fileRenamer(item.name)}
                                    </div>
                                </div>
                            )
                            })}
                          </div>
                        </div>
                      )
                    }
                  })
                }
                                       
                <Link className="archiv" href={`https://kdrive.infomaniak.com/app/share/608492/57f5c34e-9fe5-44fc-ad11-98676963674b`} target={`_blank`} ><h3>Archiv</h3></Link>
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