import Documents from "../../components/Documents"
import s from "../../styles/Page.module.css"

export default async function Page(){

    return(
        <main>
            <section className={s.section}>
                <h2>{`Dokumente`}</h2>
                <Documents />
            </section>
        </main>
    )
}