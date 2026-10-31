import Link from "next/link"
import Invitaitons from "../../components/Invitations"
import Results from "../../components/Results"
import { getPageMetadata } from "../../functions/getPageMetadata"
import { Suspense } from "react"
import Loader_Invite from "../../components/Loader_Invite"
import Loader_Result from "../../components/Loader_Result"

export async function generateMetadata(){
    return getPageMetadata("Pistole")
}

export default async function Page(){

    const date:Date = new Date()
    const currentYear:number = date.getFullYear()

    return(
        <main>
            <section className="section">
                <h2>{`Pistole`}</h2>
                <Suspense fallback={<Loader_Invite />}>
                <Invitaitons drive={process.env.KDRIVE_PIST_INV} currentYear={currentYear} />
                </Suspense>
                <Suspense fallback={<Loader_Result />}>
                <Results drive={process.env.KDRIVE_PIST_RES} currentYear={currentYear} />
                </Suspense>
                <Link className="archiv" href={`https://kdrive.infomaniak.com/app/share/${process.env.KDRIVE_ROOT}/7d5ad3ba-c137-4d02-b7ca-7bd9664817c7`} target={`_blank`} ><h3>Archiv</h3></Link>
            </section>
        </main>
    )
}
