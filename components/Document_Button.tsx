import Link from "next/link";
import { File, GetFileResponse } from "../interfaces";
import s from "../styles/Page.module.css"

interface Props{
    item: File
}

export default async function Document_Button({item}:Props){

    return(
        <Link className={`${s.item} ${s.documentButton}`} href={`/api/file/${item.id}`} target="_blank" role="button">
            <p>{item.name}</p>
        </Link>
    )
}