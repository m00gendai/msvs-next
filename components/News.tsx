import s from "../styles/News.module.css"
import { FileResponse } from "../interfaces"
import News_Button from "./News_Button"
import News_Info from "./News_Info"


async function getFiles(){
    const getSourceDirectoryList:Response = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/search?directory_id=${process.env.KDRIVE_NEWS}&depth=unlimited&order_by=added_at&order=desc&types[]=pdf&types[]=spreadsheet&types[]=text&per_page=12&with=path`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },
        cache: 'no-store'
    })
    const sourceDirectoryList:FileResponse = await getSourceDirectoryList.json()
    return sourceDirectoryList
}

export default async function News(){

    const items:FileResponse =  await getFiles()
console.log(items)
    return(
        <div className={s.container}>
        <div className={s.heading}><h2 className={s.h2}>News</h2><News_Info /></div>
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