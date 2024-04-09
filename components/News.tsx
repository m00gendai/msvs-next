import s from "../styles/News.module.css"
import { FileResponse } from "../interfaces"
import News_Button from "./News_Button"

async function getFiles(){
    const getSourceDirectoryList:Response = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/search?directory_id=${process.env.KDRIVE_NEWS}&depth=unlimited&order_by=added_at&order=desc&types[]=pdf&types[]=spreadsheet&types[]=text&per_page=12`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },

    })
    const sourceDirectoryList:FileResponse = await getSourceDirectoryList.json()
    return sourceDirectoryList
}

export default async function News(){

    const items:FileResponse =  await getFiles()

    return(
        <div className={s.container}>
        <h2>News</h2>
        <div className={s.inner}>
        {items.data.map(item =>{
                return(
                   <News_Button key={`news_${item.id}`} item={item} />
                )
            })}
        </div>
        </div>
    )
}