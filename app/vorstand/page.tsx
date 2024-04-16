import Vorstand from "../../components/Vorstand"

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