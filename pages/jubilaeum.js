import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/router'
import Header from "../components/header"
import s from "../styles/Jubilaeum.module.css"
import getFile from "../functions/getFile"
import extensionTrimmer from "../functions/extensionTrimmer"


export default function Jubiläum({
  setShow,
  sourceDirectoryList
}){

    const date = new Date()
    const currentYear = 2022 // date.getFullYear()

    const router = useRouter()
    const headUrl = `https://msvs.ch${router.pathname}`

    return(
        <>
      <Header title={"MSVS - Jubiläum"} content={"50 Jahre Matchschützenvereinigung Schaffhausen"} url={headUrl} />
        <main>
        <section className={s.section}>
          <h2>50 Jahre Matchschützenvereinigung Schaffhausen</h2>
            <div className={s.container}>
              <p>50 Jahre sind es her seit der Gründung der Matchschutzenvereinigung Schaffhausen.</p>

              <p>Wenn das nicht ein Grund ist dies in einem gebührendem Rahmen zu feiern!</p>

              <p>Die Vorstandsmitglieder des MSVS haben sich zusammengesetzt um in Form eines
              Organisationskomitees diesen Anlass aufzugleisen.
              Wir wollen mit diesem Anlass der Bevölkerung und den Freunden des Schiesssports die
              Möglichkeit bieten, den Sport näher kennenzulernen.</p>
              <h3>Sponsoring</h3>

              <p>Zur Deckung der anfallenden Kosten des Jubiläums, einer Jubiläumsschrift, und einer
              Jubiläumsfeier mit geladenen Gästen suchen wir Sponsoren und Gönner.
              Wir danken allen, die uns unterstützen, und freuen uns über jeden, der unser Vorhaben
              unterstützt.</p>

              {
                sourceDirectoryList.data.map(item =>{
                  if(item.type == "dir" && item.name == "Sponsoring"){
                    return (
                      <div className={s.results} key={`einladungFragment_${item.id}`}>
                                    <div className={s.container} key={`einladungContainer_${item.id}`}>
                                      {sourceDirectoryList.data.map(item2 =>{
                      if(item2.parent_id == item.id){
                       
                                                        return (
                                                            <div key={`einladung_${item2.id}`} className={s.item} onClick={()=>getFile(item2.id, setShow)}>
                                                                <div className={s.text}>
                                                                    {extensionTrimmer(item2.name)}
                                                                </div>
                                                            </div>
                                                        )
                      }
                    })
                  }
                  </div>
                  </div>)
                  }
                })
              }
            </div>
        </section>
        </main>

    </>
    )
}

export async function getStaticProps() {

    // Gets all folders and files in the /Resultate directory recursively, sorted by last modified
    const getSourceDirectoryList = await fetch("https://api.infomaniak.com/2/drive/608492/files/search?directory_id=15929&depth=unlimited&per_page=1000", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },

    })
    const sourceDirectoryList = await getSourceDirectoryList.json()

    return { 
        props: {
            sourceDirectoryList
        } , 
            revalidate: 2
    }
}