import Link from "next/link"
import Cup_Invitations from "../../components/Cup_Invitations"
import Cup_Results from "../../components/Cup_Results"
import { getPageMetadata } from "../../functions/getPageMetadata"
import Loader_Invite from "../../components/Loader_Invite"
import Loader_Result from "../../components/Loader_Result"
import { Suspense } from "react"

export async function generateMetadata(){
    return getPageMetadata("Kantonalcup")
}

export default async function Page(){

    const date:Date = new Date()
    const currentYear:number = date.getFullYear()

    return(
        <main>
            <section className="section">
                <h2>{`Kantonalcup`}</h2>
                <Suspense fallback={<Loader_Invite />}>
                <Cup_Invitations currentYear={currentYear} drive={process.env.KDRIVE_CUP} />
                </Suspense>
                <Suspense fallback={<Loader_Result />}>
                <Cup_Results currentYear={currentYear} drive={process.env.KDRIVE_CUP} />
                </Suspense>
                <Link className="archiv" href={`https://kdrive.infomaniak.com/app/share/${process.env.KDRIVE_ROOT}/57f5c34e-9fe5-44fc-ad11-98676963674b`} target={`_blank`} ><h3>Archiv</h3></Link>
            </section>
        </main>
    )
}
