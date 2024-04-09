import Link from "next/link"
import s from "../../styles/Page.module.css"
import Invitaitons from "../../components/Invitations"
import Results from "../../components/Results"

export default async function Page(){

    const date:Date = new Date()
    const currentYear:number = date.getFullYear()

    return(
        <main>
            <section className={s.section}>
                <h2>{`Luft`}</h2>
                <Invitaitons drive={process.env.KDRIVE_AIR_INV} currentYear={currentYear} />
                {/* TODO: Wintermeisterschaft */}
                <Results drive={process.env.KDRIVE_AIR_RES} currentYear={currentYear} />
                <Link className="archiv" href={`https://kdrive.infomaniak.com/app/share/${process.env.KDRIVE_ROOT}/225d4d16-dff3-47ab-ae41-773504b219d5`} target={`_blank`} ><h3>Archiv</h3></Link>
            </section>
        </main>
    )
}