import revalidate from "../app/actions/revalidate"
import { FileResponse } from "../interfaces"
import Result_Container from "./Result_Container"

async function getDirectory(){
    const getDirectory:Response = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/search?with=path&types[]=dir&directory_id=${process.env.KDRIVE_DOC}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },
        next: {
            tags: ["Documents"]
          }
    })

    const directory:FileResponse = await getDirectory.json()
    return directory
}

export default async function Results(){

    revalidate("Documents")
    const directory:FileResponse = await getDirectory()
    
    return(
        <>
        <h3>&nbsp;</h3>
        {
            directory.data.map(dir =>{
                return (
                    <Result_Container directory={dir} key={`Results_${dir.id}`} name={dir.path.split("/")[dir.path.split("/").length-1]}/>
                )
            })
        }
        </>
    )
}