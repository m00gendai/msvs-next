import Link from "next/link"
import s from "../../styles/Page.module.css"
import Cup_Invitations from "../../components/Cup_Invitations"
import Cup_Results from "../../components/Cup_Results"

export default async function Page(){

    const date:Date = new Date()
    const currentYear:number = date.getFullYear()-1

    return(
        <main>
            <section className={s.section}>
                <h2>{`Kantonalcup`}</h2>
                <Cup_Invitations currentYear={currentYear} drive={process.env.KDRIVE_CUP} />
                <Cup_Results currentYear={currentYear} drive={process.env.KDRIVE_CUP} />
                <Link className="archiv" href={`https://kdrive.infomaniak.com/app/share/${process.env.KDRIVE_ROOT}/225d4d16-dff3-47ab-ae41-773504b219d5`} target={`_blank`} ><h3>Archiv</h3></Link>
            </section>
        </main>
    )
}