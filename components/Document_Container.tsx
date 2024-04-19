import { File } from "../interfaces"
import s from "../styles/Page.module.css"
import Document_Button from "./Document_Button"


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
                        // ["", "MSVS", "Jubiläum", {chapter}, {document}]
                        const path:string[] = file.path.split("/")

                        if(path[2] === "Dokmente"){
                            if(`${path[2]} ${path[3]}` === name){
                                return(
                                    <Document_Button key={`result_${file.id}`} item={file}/>
                                )
                            }
                        }
                        if(path[2] === "Jubiläum"){
                            if(path[3] === name){
                                return <Document_Button key={`result_${file.id}`} item={file}/>
                            }
                        }
                    })
                }
                </div>
            </div>
        </div>
    )
}