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
                <p>Sind temporär hier zu bestaunen: <a href="https://gallery.msvs.ch/" target="_blank">https://gallery.msvs.ch/</a></p>
                {/*<Image_Container />*/}
            </section>
        </main>
    )
}