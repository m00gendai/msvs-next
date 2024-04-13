import revalidate from "../app/actions/revalidate"
import { FileResponse } from "../interfaces"
import s from "../styles/Page.module.css"
import Invitation_Button from "./Invitation_Button"

async function getDirectory(currentYear:number, drive:string | undefined){
    const date:Date = new Date()
    const month:number = date.getMonth()+1

    const getDirectory:Response = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/search?directory_id=${drive}&depth=unlimited&per_page=1000&types[]=dir&query=${drive === process.env.KDRIVE_AIR_INV && month < 6 ? `"${currentYear}" | "${currentYear-1}"` : `"${currentYear}"`}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },
        next: {
            tags: ["CupDocs"]
        }
    })

    const directory:FileResponse = await getDirectory.json()
    return directory
}

async function getDirectoryInvitation(id:number){
    const date:Date = new Date()
    const month:number = date.getMonth()+1

    const getDirectory:Response = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/search?directory_id=${id}&depth=unlimited&per_page=1000&types[]=dir&query=Dokumente`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },
        next: {
            tags: ["CupDocs"]
        }
    })

    const directory:FileResponse = await getDirectory.json()
    return directory
}

async function getFiles(id:number){
    const getFiles:Response = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/search?directory_id=${id}&depth=unlimited&per_page=1000&types[]=file`,{
    method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },
        next: {
            tags: ["CupDocs"]
        }
    })

    const files = await getFiles.json()
    return files
}

interface Props{
    drive: string | undefined
    currentYear: number
}

export default async function Cup_Invitations({drive, currentYear}:Props){
    revalidate("CupDocs")
    const directory:FileResponse = await getDirectory(currentYear, drive)
    if(directory.data.length === 0){
        return (
            <>
            <h3>{`Dokumente ${currentYear}`}</h3>
            <div className={s.results}>
                <p>{`Noch keine Einladung für ${currentYear}`}</p>
            </div>
            </>
        )
    }
    const directoryInvitation:FileResponse = await getDirectoryInvitation(directory.data[0].id)
    const files:FileResponse | null = directoryInvitation.data.length === 0 ? null : await getFiles(directoryInvitation.data[0].id)

    return(
        <>
        <h3>{`Dokumente ${currentYear}`}</h3>
            <div className={s.results}>
            {
                files !== null ? 
                    <div className={s.fileContainer}>
                        {
                            files.data.map(file =>{
                                return(
                                    <Invitation_Button key={`invitation_${file.id}`} item={file}/>
                                        
                                )
                            })
                        }
                    </div>
                :
                    <p>{`Noch keine Einladungen für ${currentYear}`}</p>
            }
            </div>
        </>
    )
}