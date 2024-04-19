import Link from "next/link"
import Invitaitons from "../../components/Invitations"
import Results from "../../components/Results"
import Results_WM from "../../components/Results_WM"
import { getPageMetadata } from "../../functions/getPageMetadata"

export async function generateMetadata(){
    return getPageMetadata("Luft")
}

export default async function Page(){

    const date:Date = new Date()
    const currentYear:number = date.getFullYear()

    return(
        <main>
            <section className="section">
                <h2>{`Luft`}</h2>
                <Invitaitons drive={process.env.KDRIVE_AIR_INV} currentYear={currentYear} />
                <Results_WM drive={process.env.KDRIVE_AIR_WM} currentYear={currentYear} />
                <Results drive={process.env.KDRIVE_AIR_RES} currentYear={currentYear} />
                <Link className="archiv" href={`https://kdrive.infomaniak.com/app/share/${process.env.KDRIVE_ROOT}/225d4d16-dff3-47ab-ae41-773504b219d5`} target={`_blank`} ><h3>Archiv</h3></Link>
            </section>
        </main>
    )
}