import Vorstand from "../../components/Vorstand"
import { getPageMetadata } from "../../functions/getPageMetadata"

export async function generateMetadata(){
    return getPageMetadata("Vorstand")
}

export default async function Page(){

    return(
        <main>
            <section className="section">
                <h2>{`Vorstand`}</h2>
               <Vorstand />
            </section>
        </main>
    )
}