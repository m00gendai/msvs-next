import { FileResponse, File } from "../interfaces"
import Cup_Result_Container from "./Cup_Result_Container"
import s from "../styles/Page.module.css"

async function getDirectory(currentYear:number, drive:string | undefined){
    const date:Date = new Date()
    const month:number = date.getMonth()+1

    const getDirectory:Response = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/search?directory_id=${drive}&depth=unlimited&per_page=1000&types[]=dir&query=${drive === process.env.KDRIVE_AIR_INV && month < 6 ? `"${currentYear}" | "${currentYear-1}"` : `"${currentYear}"`}`, {
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
    const date:Date = new Date()
    const month:number = date.getMonth()+1

    const getDirectory:Response = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/search?directory_id=${id}&depth=unlimited&per_page=1000&types[]=file&with=path`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },
    })

    const directory:FileResponse = await getDirectory.json()
    return directory
}

interface Props{
    drive: string | undefined
    currentYear: number
}

function assemble(files:FileResponse){
    const combinations:File[] = files.data.filter(file =>{
        const path:string[] = file.path.split("/")
        return path.includes("Kombinationen")
    })
    const results:File[] = files.data.filter(file =>{
        const path:string[] = file.path.split("/")
        return path.includes("Resultate")
    })

    return [...combinations, ...results]
}

function sortRounds(tierList:File[], rounds:number){
    const sorted:File[] = tierList.sort((a,b)=>{
        // ["", "MSVS", "Kantonalcup", "{year}", "Resultate | Kombinationen", "Runde [0-9] | Finale", "{filename}"]
        const pathA:string = a.path.split("/")[5] === "Finale" ? `Runde ${rounds}` :  a.path.split("/")[5]
        const pathB:string = b.path.split("/")[5] === "Finale" ? `Runde ${rounds}` :  b.path.split("/")[5]
        const x:number = parseInt(pathA.split(" ")[1])
        const y:number = parseInt(pathB.split(" ")[1])
        return x > y ? 1 : x < y ? -1 : 0
    })
     
    return sorted.reverse()
}

function sortRoundNames(names:Set<string>, rounds:number){
    const arr:string[] = Array.from(names)

    const sorted:string[] = arr.sort((a,b)=>{
        const pathA:string = a.split(" ")[1] === "Finale" ? `Runde ${rounds}` :  `${a.split(" ")[1]} ${a.split(" ")[2]}`
        const pathB:string = b.split(" ")[1] === "Finale" ? `Runde ${rounds}` :  `${b.split(" ")[1]} ${b.split(" ")[2]}`
        const x:number = parseInt(pathA.split(" ")[1])
        const y:number = parseInt(pathB.split(" ")[1])
        return x > y ? 1 : x < y ? -1 : 0
    })
     
    return sorted.reverse()
}

export default async function Cup_Results({drive, currentYear}:Props){

    const directory:FileResponse = await getDirectory(currentYear, drive)
    if(directory.data.length === 0){
        return (
            <>
            <h3>{`Kombinationen & Resultate ${currentYear}`}</h3>
            <div className={s.results}>
                <p>{`Noch keine Kombinationen für ${currentYear}`}</p>
            </div>
            </>
        )
    }
    const files:FileResponse = await getFiles(directory.data[0].id)

    const tierList:File[] = assemble(files)

    const totalRounds:Set<string> = new Set(tierList.map(file=>{
        return file.path.split("/")[5]
    }))

    const roundNames:Set<string> = new Set(tierList.map(file=>{
        return `${file.path.split("/")[4]} ${file.path.split("/")[5]}`
    }))

    const sortedRoundNames = sortRoundNames(roundNames, totalRounds.size)

    const sortedTiers:File[] = sortRounds(tierList, totalRounds.size)

    return(
        <>
        <h3>{`Kombinaionen & Resultate ${currentYear}`}</h3>
        {
            sortedRoundNames.map(round=>{
                return <Cup_Result_Container key={round} name={round} files={sortedTiers} />
            })
        }
        </>
    )
}