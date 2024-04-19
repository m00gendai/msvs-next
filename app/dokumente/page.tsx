import Documents from "../../components/Documents"
import { getPageMetadata } from "../../functions/getPageMetadata"

export async function generateMetadata(){
    return getPageMetadata("Dokumente")
}

export default async function Page(){

    return(
        <main>
            <section className="section">
                <h2>{`Dokumente`}</h2>
                <Documents />
            </section>
        </main>
    )
}