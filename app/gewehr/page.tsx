import Link from "next/link"
import Invitaitons from "../../components/Invitations"
import Results from "../../components/Results"
import { getPageMetadata } from "../../functions/getPageMetadata"
import { Suspense } from "react"
import Loader_Result from "../../components/Loader_Result"
import Loader_Invite from "../../components/Loader_Invite"

export async function generateMetadata(){
    return getPageMetadata("Gewehr")
}

export default async function Page(){

    const date:Date = new Date()
    const currentYear:number = date.getFullYear()

    return(
        <main>
            <section className="section">
                <h2>{`Gewehr`}</h2>
                <Suspense fallback={<Loader_Invite />}>
                <Invitaitons drive={process.env.KDRIVE_GEW_INV} currentYear={currentYear} />
                </Suspense>
                <Suspense fallback={<Loader_Result />}>
                <Results drive={process.env.KDRIVE_GEW_RES} currentYear={currentYear} />
                </Suspense>
                <Link className="archiv" href={`https://kdrive.infomaniak.com/app/share/${process.env.KDRIVE_ROOT}/225d4d16-dff3-47ab-ae41-773504b219d5`} target={`_blank`} ><h3>Archiv</h3></Link>
            </section>
        </main>
    )
}