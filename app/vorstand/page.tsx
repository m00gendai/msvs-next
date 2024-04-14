import Cup_Result_Button from "../../components/Cup_Result_Button"
import Document_Container from "../../components/Document_Container"
import Vorstand from "../../components/Vorstand"
import { CMS_Page, FileResponse } from "../../interfaces"
import s from "../../styles/Page.module.css"
import revalidate from "../actions/revalidate"

export default async function Page(){

    return(
        <main>
            <section className={s.section}>
                <h2>{`Vorstand`}</h2>
               <Vorstand />
            </section>
        </main>
    )
}