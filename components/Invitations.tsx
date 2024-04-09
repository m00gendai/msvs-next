import { FileResponse } from "../interfaces"
import s from "../styles/Page.module.css"
import Invitation_Button from "./Invitation_Button"

async function getDirectory(currentYear:number, drive:string | undefined){
    const getDirectory:Response = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/search?with=path&types[]=dir&query="${currentYear}"&directory_id=${drive}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },
    })

    const directory:FileResponse = await getDirectory.json()
    return directory
}

async function getFiles(id:number){
    const getFiles:Response = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/${id}/files`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.KDRIVE}`,
                "Content-Type" : "application/json"
            },
        })
    
        const files:FileResponse = await getFiles.json()
        return files
}

interface Props{
    drive: string | undefined
    currentYear: number
}

export default async function Invitaitons({drive, currentYear}:Props){

    const directory:FileResponse = await getDirectory(currentYear, drive)
    const files:FileResponse = await getFiles(directory.data[0].id)

    return(
        <>
        <h3>{`Einladungen`}</h3>
            <div className={s.results}>
            {
                files.data.length !== 0 ? 
                    <div className={s.container}>
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