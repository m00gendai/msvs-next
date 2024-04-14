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
                <div className={s.fileContainer}>
                {
                    files.map(file =>{
                        // ["", "MSVS", "Dokumente", {type}, {document}]
                        const path:string[] = file.path.split("/")
                        if(`${path[2]} ${path[3]}` === name){
                            return(
                                <Cup_Result_Button key={`result_${file.id}`} item={file}/>
                            )
                        }
                        
                    })
                }
                </div>
            </div>
        </div>
    )
}