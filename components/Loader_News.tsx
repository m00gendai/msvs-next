import s from "../styles/News.module.css"
import News_Info from "./News_Info"

export default async function News(){

    return(
        <div className={s.container}>
        <div className={s.heading}><h2 className={s.h2}>News</h2><News_Info /></div>
        <div className={s.inner}>
        Lade News...
        </div>
        </div>
    )
}