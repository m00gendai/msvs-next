import { getPageMetadata } from "../../functions/getPageMetadata"
import { Legal } from "../../interfaces"

async function getContent(){
    const getContent:Response = await fetch(`https://cms.msvs.ch/api/content/items/dsgvo`, {
        method: "GET",
        headers: {
            "api-key": process.env.CMS!
        }
    })
    const content:Legal[] = await getContent.json()
    return content
}

export async function generateMetadata(){
    return getPageMetadata("DSGVO")
}

export default async function Page(){

	const content:Legal[] = await getContent()

    return(
        <main>
            <section className="section">
			<h2>{`Datenschutzerklärung`}</h2>
			{content[0].text ? <div className="textContent" dangerouslySetInnerHTML={{__html: content[0].text}}></div> : null}
            </section>
        </main>
    )
}