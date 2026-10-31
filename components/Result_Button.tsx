import Link from "next/link";
import extensionTrimmer from "../functions/extensionTrimmer";
import { File, GetFileResponse } from "../interfaces";
import s from "../styles/Page.module.css"


interface Props{
    item: File
}

export default async function Result_Button({item}:Props){

    return(
        <Link className={`${s.item} ${s.resultButton}`} href={`/api/file/${item.id}`} target="_blank">
            <p>{extensionTrimmer(item.name)}</p>
        </Link>
    )
}