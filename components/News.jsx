import s from "../styles/News.module.css"
import getFile from "../functions/getFile"

export default function News({items}){

    return(
        <div className={s.container}>
        <h2>News</h2>
        <div className={s.inner}>
            {items.map(item =>{
                const name = item.name.replaceAll("_", " ").replace(".pdf", "")
                return <div className={s.item} key={item.id} onClick={()=>getFile(item.id)}>{name}</div>
            })}
        </div>
        </div>
    )
}