import Image_Container from "../../components/Image_Container"
import s from "../../styles/Gallery.module.css"

export default async function Page(){
    return(
        <main>
            <section className={s.section}>
                <h2>Bilder</h2> 
                <Image_Container />
            </section>
        </main>
    )
}