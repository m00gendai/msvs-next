import Head from 'next/head'
import Image from "next/image"
import { useRouter } from 'next/router'
import Header from "../components/header"
import s from "../styles/Page.module.css"

export default function Gewehr(
    {
        sourceDirectoryList, 
        images
    }
    ){

    const date = new Date()
    const currentYear = 2022 // date.getFullYear()

    const router = useRouter()
    const headUrl = `https://pistolenclub-hallau.ch${router.pathname}`

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
        <Header title={"MSVS - Gewehr"} content={"MSVS Gewehr"} url={headUrl} />
        <main>
            <section className={s.section}>
                <h2>Gewehr</h2> 
                <h3>Einladungen</h3>
                {
                    results.map(result =>{
                        if(result.type == "dir" && isNaN(parseInt(result.name)) && currentYearDirIds.includes(result.id) && result.name == "Einladungen"){ 
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
                <h3>Resultate</h3>
                {
                    results.map(result =>{
                        if(result.type == "dir" && isNaN(parseInt(result.name)) && currentYearDirIds.includes(result.id) && result.name != "Einladungen"){ 
                        /* If directory AND the directory name is not a number AND there is a subdirectory with the name of the current 
                            year present (see parent_id filtering above) */
                            return (
                                <div className={s.results} key={`imageFragment_${result.id}`}>
                                    <h4 key={`imageTitle_${result.name}`}>{result.name}</h4> {/* only displayed if there is something for the current year */}
                                    <div key={`imageContainer_${result.name}`} className={s.imageContainer}>
                                    {
                                        results.map(result2 =>{
                                            if(result2.type == "dir" && result2.name == currentYear.toString() && result2.parent_id == result.id){
                                                return images.map(img =>{
                                                    if(img.parent == result2.id){
                                                        return <img src={`data:$;base64, ${img.string}`} height={"250"} key={`imageItem_${img.id}`}/>
                                                    }
                                                })
                                            }
                                        })
                                    }
                                    </div>
                                    <div key={`linkContainer_${result.name}`} className={s.container}>
                                    {
                                        results.map(result2 =>{
                                            if(result2.type == "dir" && result2.name == currentYear.toString() && result2.parent_id == result.id){
                                                return results.map(result3 =>{
                                                    if(result3.type == "file" && result3.parent_id == result2.id){
                                                        const name = result3.name.replaceAll("_", " ").replace(".pdf", "")
                                                        if(!result3.mime_type.startsWith("image")){
                                                            return(
                                                                <div key={`result_${result3.id}`} className={s.item} onClick={()=>getFile(result3.id)}>
                                                                    <div className={s.text}>
                                                                        {name}
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
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
            </section>
        </main>
        </>
    )
}

export async function getStaticProps() {

    // Gets all folders and files in the /Resultate directory recursively, sorted by last modified
    const getSourceDirectoryList = await fetch("https://api.infomaniak.com/2/drive/608492/files/search?directory_id=15713&depth=unlimited&per_page=1000", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },

    })
    const sourceDirectoryList = await getSourceDirectoryList.json()

    // Gets all images in the /Resultate directory recursively, sorted by last modified
    const getSourceImageList = await fetch("https://api.infomaniak.com/2/drive/608492/files/search?directory_id=15713&depth=unlimited&per_page=1000&types[]=image", {
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