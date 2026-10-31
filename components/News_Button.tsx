import Link from "next/link";
import extensionTrimmer from "../functions/extensionTrimmer";
import { File, GetFileResponse } from "../interfaces";
import s from "../styles/News.module.css"
import { getNewsType } from "../functions/getNewsType";


interface Props{
    item: File
}


export default async function NewsButton({item}:Props){

    const itemType:{type:JSX.Element, document:JSX.Element} = getNewsType(item.path)

    return(
        <Link className={s.item} href={`/api/file/${item.id}`} target="_blank" prefetch={false}>
            <div className={s.icons}>{itemType.type} {itemType.document}</div>
            <div className={s.title}>{extensionTrimmer(item.name)}</div>
        </Link>
    )
}