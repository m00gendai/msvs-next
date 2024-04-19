import Links from "../../components/Links"
import { getPageMetadata } from "../../functions/getPageMetadata"

export async function generateMetadata(){
    return getPageMetadata("Links")
}

export default async function Page(){

    return(
        <main>
            <section className="section">
                <h2>{`Links`}</h2>
                <Links />
        </section>
        </main>
    )
}