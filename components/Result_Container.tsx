import { File, FileResponse } from "../interfaces"
import s from "../styles/Page.module.css"
import Result_Button from "./Result_Button"

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
    directory: File
    name: string
}

export default async function Result_Container({directory, name}:Props){

    const files:FileResponse = await getFiles(directory.id)

    return(
        <div className={s.results}>
            <h4>{name}</h4>
            <div className={s.container}>
            {
                files.data.map(file =>{
                    if(file.parent_id == directory.id){
                        return(
                            <Result_Button key={`result_${file.id}`} item={file}/>
                        )
                    }
                    
                })
            }
            </div>
        </div>
    )
}