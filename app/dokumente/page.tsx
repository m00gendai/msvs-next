import Documents from "../../components/Documents"

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