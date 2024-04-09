import revalidate from "../app/actions/revalidate"
import { FileResponse } from "../interfaces"
import s from "../styles/Page.module.css"
import Result_Container from "./Result_Container"

async function getDirectory(currentYear:number, drive:string | undefined){
    const getDirectory:Response = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/search?with=path&types[]=dir&query="${currentYear}"&directory_id=${drive}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },
        next: {
            tags: ["ResultDirs"]
          }
    })

    const directory:FileResponse = await getDirectory.json()
    return directory
}

interface Props{
    drive: string | undefined
    currentYear: number
}

export default async function Results({drive, currentYear}:Props){

    revalidate("ResultDirs")
    const directory:FileResponse = await getDirectory(currentYear, drive)
    
    return(
        <>
        <h3>{`Resultate`}</h3>
        {
            directory.data.length === 0 ? 
                <div className={s.results}>
                    <p>{`Noch keine Resultate von ${currentYear}`}</p>
                </div>
            :
                directory.data.map(dir =>{
                    return (
                        <Result_Container directory={dir} key={`Results_${dir.id}`} name={dir.path.split("/")[dir.path.split("/").length-2]}/>
                    )
                })
            }
        </>
    )
}