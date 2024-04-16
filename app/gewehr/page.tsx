import Link from "next/link"
import s from "../../styles/Page.module.css"
import Invitaitons from "../../components/Invitations"
import Results from "../../components/Results"

export default async function Page(){

    const date:Date = new Date()
    const currentYear:number = date.getFullYear()

    return(
        <main>
            <section className="section">
                <h2>{`Gewehr`}</h2>
                <Invitaitons drive={process.env.KDRIVE_GEW_INV} currentYear={currentYear} />
                <Results drive={process.env.KDRIVE_GEW_RES} currentYear={currentYear} />
                <Link className="archiv" href={`https://kdrive.infomaniak.com/app/share/${process.env.KDRIVE_ROOT}/225d4d16-dff3-47ab-ae41-773504b219d5`} target={`_blank`} ><h3>Archiv</h3></Link>
            </section>
        </main>
    )
}