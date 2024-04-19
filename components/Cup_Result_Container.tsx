import revalidate from "../app/actions/revalidate"
import { File, FileResponse, GetFileResponse } from "../interfaces"
import s from "../styles/Page.module.css"
import Cup_Result_Image from "./Cup_Result_Image"
import Cup_Result_Button from "./Cup_Result_Button"


interface Props{
    name: string
    files: File[]
}

export default async function Result_Container({name, files}:Props){

    return(
        <div className={s.results}>
            <h4>{name}</h4>
            <div className={s.container}>
                <div className={s.imageContainer}>
                {
                    files.map(file =>{
                        // ["", "MSVS", "Kantonalcup", "{year}", "Resultate | Kombinationen", "Runde [0-9] | Finale", "{filename}"]
                        const path:string[] = file.path.split("/")
                        if(`${path[4]} ${path[5]}` === name && file.extension_type === "image"){
                            return <Cup_Result_Image key={`image_${file.id}`} file={file}/>
                        }
                        
                    })
                }
                </div>
                <div className={s.fileContainer}>
                {
                    files.map(file =>{
                        // ["", "MSVS", "Kantonalcup", "{year}", "Resultate | Kombinationen", "Runde [0-9] | Finale", "{filename}"]
                        const path:string[] = file.path.split("/")
                        if(`${path[4]} ${path[5]}` === name && file.extension_type !== "image"){
                            return(
                                <Cup_Result_Button key={`result_${file.id}`} item={file} type={name}/>
                            )
                        }
                        
                    })
                }
                </div>
            </div>
        </div>
    )
}