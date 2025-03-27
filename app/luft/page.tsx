import Link from "next/link"
import Invitaitons from "../../components/Invitations"
import Results from "../../components/Results"
import Results_WM from "../../components/Results_WM"
import { getPageMetadata } from "../../functions/getPageMetadata"
import { Suspense } from "react"
import Loader_Invite from "../../components/Loader_Invite"
import Loader_Result from "../../components/Loader_Result"

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
                <Suspense fallback={<Loader_Invite />}>
                <Invitaitons drive={process.env.KDRIVE_AIR_INV} currentYear={currentYear} />
                </Suspense>
                <Suspense fallback={<Loader_Result />}>
                <Results_WM drive={process.env.KDRIVE_AIR_WM} currentYear={currentYear} />
                </Suspense>
                <Suspense fallback={<Loader_Result />}>
                <Results drive={process.env.KDRIVE_AIR_RES} currentYear={currentYear} />
                </Suspense>
                <Link className="archiv" href={`https://kdrive.infomaniak.com/app/share/${process.env.KDRIVE_ROOT}/94b83338-91f4-4c68-b8d4-6a46f79a828c`} target={`_blank`} ><h3>Archiv</h3></Link>
            </section>
        </main>
    )
}
