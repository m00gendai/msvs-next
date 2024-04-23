import { Suspense } from "react"
import Documents from "../../components/Documents"
import { getPageMetadata } from "../../functions/getPageMetadata"
import Loader_Result from "../../components/Loader_Result"

export async function generateMetadata(){
    return getPageMetadata("Dokumente")
}

export default async function Page(){

    return(
        <main>
            <section className="section">
                <h2>{`Dokumente`}</h2>
                <Suspense fallback={<Loader_Result />}>
                <Documents />
                </Suspense>
            </section>
        </main>
    )
}