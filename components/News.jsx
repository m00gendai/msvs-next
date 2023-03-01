import s from "../styles/News.module.css"
import getFile from "../functions/getFile"
import extensionTrimmer from "../functions/extensionTrimmer"

export default function News({setShow, items}){
    return(
        <div className={s.container}>
        <h2>News</h2>
        <div className={s.inner}>
            {items.map(item =>{
                return(
                    <div className={s.item} key={item.id} onClick={()=>getFile(item.id, setShow)}>
                        <p>{extensionTrimmer(item.name)}</p>
                    </div>
                )
            })}
        </div>
        </div>
    )
}