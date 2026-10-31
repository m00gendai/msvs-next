import Link from "next/link";
import extensionTrimmer from "../functions/extensionTrimmer";
import { File, GetFileResponse } from "../interfaces";
import s from "../styles/Page.module.css"


interface Props{
    item: File
}

export default async function Invitation_Button({item}:Props){

    return(
        <Link className={`${s.item} ${s.documentButton}`} href={`/api/file/${item.id}`} target="_blank" role="button">
            <p>{extensionTrimmer(item.name)}</p>
        </Link>
    )
}