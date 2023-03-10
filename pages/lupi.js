import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'
import { useState } from "react"
import Header from "../components/header"
import s from "../styles/Page.module.css"
import getFile from "../functions/getFile"
import extensionTrimmer from "../functions/extensionTrimmer"
import YearPicker from "../components/YearPicker"


export default function Lupi(
  {
    setShow,
    sourceDirectoryList,
    images
  } 
){

  const date = new Date()
  const [currentYear, setCurrentYear] = useState(date.getFullYear())

  const router = useRouter()
  const headUrl = `https://msvs.ch${router.pathname}`

  const results = sourceDirectoryList.data.sort((a,b) =>{
      const x = a.added_at
      const y = b.added_at
      return x < y ? 1 : x > y ? -1 : 0
  })

  /*
  Compared to usual yearly results, the winter championship spans over two years (eg 2022/2023).
  This makes getting the current active Season a bit more complicated, since one season ends and another begins in the same year
  (eg if the current year is 2023, season 2022/2023 ends and 2023/2024 begins)
  So basically the following code determines the seasons for the current year and checks which one is currently active.
  */

  // First, filter the directory for every folder that starts with "Saison"
  const currentYearDirs = results.filter(result =>{ 
      return result.name.startsWith("Saison ")
  })

  // Then, grab the two year mentions in the name (eg "Saison 2022-2023" returns ["2022", "2023"])
  const seasons = currentYearDirs.map(season =>{
    const years = season.name.replace("Saison ", "")
    return years.split("-")
  })

  // From that, filter every array based on if it includes the current year 
  const currentSeasons = seasons.filter(season =>{
    return season.includes(currentYear.toString())
  })

  /*
  That returns either one array (beginning of current year) or two (end of current year).
  So, it must be determined which season has to be displayed.
  This is simply done by either returning the single season, or if there are two, returning the one with 
  the current year first.
  */
  const currentSeason = currentSeasons.filter(season =>{
    if(currentSeasons.length == 1){
      return season
    }
    if(currentSeasons.length == 2){
      return season[0] == currentYear
    }
  })

  // This just reassembles the directory name of the currently active season
  const currentSeasonString = `Saison ${currentSeason[0][0]}-${currentSeason[0][1]}`

  // To get the directory id, all the directories get checked agains the currently active season name
  const currentYearDirIds = currentYearDirs.filter(item=>{
    if(item.name == currentSeasonString){
      return item.parent_id
    }
  })

  // Now this is for the entire rest of the files
  const currentYearDirs2 = results.filter(result =>{ // This filters for all directories of the current year
        return result.name == currentYear.toString()
    })

    const currentYearDirIds2 = currentYearDirs2.map(item=>{ // this extracts the parent_id of the current year directories
        return item.parent_id
    })

    const einladungen = results.filter(result =>{
        return result.type == "dir" && isNaN(parseInt(result.name)) && currentYearDirIds.includes(result.id) && result.name == "Einladungen"
    })

  return(
    <>
    <Header title={"MSVS - Lupi"} content={"MSVS Lupi"} url={headUrl} />
    <main>
      <section className={s.section}>
        <h2>{`Lupi`}<YearPicker currentYear={currentYear} setCurrentYear={setCurrentYear}/></h2>
        <h3>{`Einladungen ${currentYear}`}</h3>
        {
          einladungen.length == 0 ?
            <p className ="noEntry">Noch keine Einladungen dieses Jahr.</p> :
            results.map(result =>{
                if(result.type == "dir" && isNaN(parseInt(result.name)) && currentYearDirIds2.includes(result.id) && result.name == "Einladungen"){ 
                /* If directory AND the directory name is not a number AND there is a subdirectory with the name of the current 
                    year present (see parent_id filtering above) */
                    return (
                        <div className={s.results} key={`einladungFragment_${result.id}`}>
                            <div className={s.container} key={`einladungContainer_${result.id}`}>
                            {
                                results.map(result2 =>{
                                    if(result2.type == "dir" && result2.name == currentYear.toString() && result2.parent_id == result.id){
                                        return results.map(result3 =>{
                                            if(result3.type == "file" && result3.parent_id == result2.id){
                                                
                                                return (
                                                    <div key={`einladung_${result3.id}`} className={s.item} onClick={()=>getFile(result3.id, setShow)}>
                                                        <div className={s.text}>
                                                            {extensionTrimmer(result3.name)}
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
            if(result.type == "dir" && result.name == currentSeasonString ){ 
              return (
                <div className={s.results} key={`winterFragment`}>
                  <h4 key={`winterTitle`}>{`Wintermeisterschaft ${currentSeasonString}`}</h4>
                  <div key={`linkContainer_${result.name}`} className={s.container}>
                    {
                      results.map(result2 =>{
                        if(result2.type == "file" && result2.parent_id == result.id){
           
                          return(
                            <div key={`result_${result2.id}`} className={s.item} onClick={()=>getFile(result2.id, setShow)}>
                              <div className={s.text}>
                                {extensionTrimmer(result2.name)}
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
        {
          results.map(result =>{
            if(result.type == "dir" && result.name == "Resultate"){ 
              return results.map(result2 =>{
                if(result2.type == "dir" && result2.parent_id == result.id){
                  return results.map(result3 =>{
                    if(result3.type == "dir" && result3.name == currentYear.toString() && result3.parent_id == result2.id){
                      return(
                        <div className={s.results} key={`resultFragment_${result3.id}`}>
                          <h4 key={`resultTitle_${result2.id}`}>{result2.name}</h4>
                          <div key={`imageContainer_${result.name}`} className={s.imageContainer}>
                            {
                                images.map(img =>{
                                            if(img.parent == result3.id){
                                                return <img className={s.image} src={`data:$;base64, ${img.string}`} key={`imageItem_${img.id}`}/>
                                            }
                                        })
                                   
                            }
                          </div>
                          <div key={`linkContainer_${result2.name}`} className={s.container}>
                          {
                            results.map(result5 =>{
                              if(result5.type == "file" && result5.parent_id == result3.id){
                                if(!result5.mime_type.startsWith("image")){
                                
                                return(
                                  <div key={`result_${result5.id}`} className={s.item} onClick={()=>getFile(result5.id, setShow)}>
                                    <div className={s.text}>
                                      {extensionTrimmer(result5.name)}
                                    </div>
                                  </div>
                                )
                                }
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
        <Link className="archiv" href={`https://kdrive.infomaniak.com/app/share/608492/94b83338-91f4-4c68-b8d4-6a46f79a828c`} target={`_blank`} ><h3>Archiv</h3></Link>
      </section>
    </main>
    </>
  )
}

export async function getStaticProps() {

    // Gets all folders and files in the /Pistole directory recursively, sorted by last modified
    const getSourceDirectoryList = await fetch("https://api.infomaniak.com/2/drive/608492/files/search?directory_id=15715&depth=unlimited&per_page=1000", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },

    })
    const sourceDirectoryList = await getSourceDirectoryList.json()

    // Gets all images in the /Resultate directory recursively, sorted by last modified
    const getSourceImageList = await fetch("https://api.infomaniak.com/2/drive/608492/files/search?directory_id=15715&depth=unlimited&per_page=1000&types[]=image", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },

    })
    const sourceImageList = await getSourceImageList.json()

    // Gets preview Image object for each image file
    const images = await Promise.all(sourceImageList.data.map(async image =>{
        let getImg = await fetch(`https://api.infomaniak.com/2/drive/608492/files/${image.id}/preview`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.KDRIVE}`,
                "Content-Type" : "application/json"
            },
        })
        // Magic by https://stackoverflow.com/questions/72036447/createobjecturl-error-argument-must-be-an-instance-of-blob-received-an-instan
        getImg = await getImg.arrayBuffer()
        const img = Buffer.from(getImg).toString("base64")
        return {id: image.id, parent: image.parent_id, string: img}
    }))

    return { 
        props: {
            sourceDirectoryList, images
        } , 
            revalidate: 2
    }
}