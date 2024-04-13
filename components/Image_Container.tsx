import { Suspense } from "react"
import { FileResponse } from "../interfaces"
import Image_Folder from "./Image_Folder"
import s from "../styles/Image_Folder.module.css"

async function getDirectories(){
    const getDirectories:Response = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/search?directory_id=${process.env.KDRIVE_IMG}&types[]=dir&depth=unlimited&per_page=1000`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },

    })

    const directories:FileResponse = await getDirectories.json()
    return directories
}

export default async function Image_Container(){

    const unsortedFolders:FileResponse = await getDirectories()
    const folders = unsortedFolders.data.sort((a, b)=>{
        const x = a.name
        const y = b.name
        return x > y ? 1 : x < y ? -1 : 0
    })

    return(
        <>
            {folders.map(folder=>{
                return (
                    <Suspense key={`suspense_${folder.id}`} fallback={
                        <details className={`${s.details} ${s.disabled}`}>
                            <summary className={s.summary}>
                                <h2 className={s.title}>
                                    {`Lädt Galerie ${folder.name}...`}
                                </h2>
                            </summary >
                            <div className={s.container}>
                                <div className={s.inner}>
                                </div>
                            </div>
                        </details>
                    }>
                        <Image_Folder key={folder.id} id={folder.id} name={folder.name}/>
                    </Suspense>
                )
            })}
        </>
    )
}