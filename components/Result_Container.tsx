import revalidate from "../app/actions/revalidate"
import { File, FileResponse, GetFileResponse } from "../interfaces"
import s from "../styles/Page.module.css"
import Result_Button from "./Result_Button"
import Result_Image from "./Result_Image"

async function getFiles(id:number){
    const getFiles:Response = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/${id}/files`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.KDRIVE}`,
                "Content-Type" : "application/json"
            },
            next: {
                tags: ["ResultFiles"]
              }
        })
    
        const files:FileResponse = await getFiles.json()
        return files
}

interface Props{
    directory: File
    name: string
}

export default async function Result_Container({directory, name}:Props){

    revalidate("ResultFiles")
    const files:FileResponse = await getFiles(directory.id)
    const imageCount:File[] = files.data.filter(file => file.extension_type === "image")
    return(
        <div className={s.results}>
            <h4>{name}</h4>
            <div className={s.container}>
                {imageCount.length !== 0 ? 
                <div className={s.imageContainer}>
                {
                    files.data.map(file =>{
                        if(file.parent_id == directory.id && file.extension_type === "image"){
                            return <Result_Image key={`image_${file.id}`} file={file}/>
                        }
                        
                    })
                }
                </div>
                : null}
                <div className={s.fileContainer} style={imageCount.length !== 0 ? {padding: "0.5rem 0 0 0"} : {}}>
                    {
                        files.data.map(file =>{
                            if(file.parent_id == directory.id && file.extension_type !== "image"){
                                return(
                                    <Result_Button key={`result_${file.id}`} item={file}/>
                                )
                            }
                            
                        })
                    }
                </div>
            </div>
        </div>
    )
}