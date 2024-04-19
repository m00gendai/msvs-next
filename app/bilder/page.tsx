import Image_Container from "../../components/Image_Container"
import { getPageMetadata } from "../../functions/getPageMetadata"

export async function generateMetadata(){
    return getPageMetadata("Bilder")
}

export default async function Page(){
    return(
        <main>
            <section className="section">
                <h2>Bilder</h2> 
                <Image_Container />
            </section>
        </main>
    )
}