import Link from "next/link"
import { useRouter } from 'next/router'
import Header from "../components/header"
import s from "../styles/Impressum.module.css"

export default function Impressum(){

  const router = useRouter()
    const headUrl = `https://msvs.ch${router.pathname}`

    return(
        <>
      <Header title={"MSVS - Impressum"} content={"MSVS - Impressum"} url={headUrl} />
        <main>
        <section className={s.section}>
          <h2>Impressum</h2> 
<div className={s.gridContainer}>
                    <div className={s.containerItem}>
                        <strong className={s.strong}>Eigentümer</strong>
                        <p>Matchschützenvereinigung Schaffhausen</p>
                        <p>8200 Schaffhausen</p>
                        <p>Schweiz</p>
                        <Link className={s.link} href="https://msvs.ch" target="_blank">https://msvs.ch</Link>
                    </div>
                    <div className={s.containerItem}>
                        <strong className={s.strong}>Verantwortlicher Webseite</strong>
                        <p>mrweber.ch</p>
                        <p>Marcel Weber</p>
                        <p>8215 Hallau</p>
                        <p>Schweiz</p>
                        <Link className={s.link} href="https://mrweber.ch" target="_blank">https://mrweber.ch</Link>
                        <Link className={s.link} href="mailto:info@mrweber.ch" target="_blank">info@mrweber.ch</Link>
                    </div>
                    <div className={s.containerItem}>
                        <strong className={s.strong}>Hosting Webseite</strong>
                        <p>Vercel Inc.</p>
                        <p>440 N Barranca Ave #4133</p>
                        <p>Covina</p>
                        <p>California 91723</p>
                        <p>USA</p>
                        <Link className={s.link} href="https://vercel.com/" target="_blank">https://vercel.com/</Link>
                    </div>
                    <div className={s.containerItem}>
                        <strong className={s.strong}>Hosting Dokumente</strong>
                        <p>Infomaniak SA</p>
                        <p>25 Eugène-Marziano</p>
                        <p>1227 Les Acacias Ville de Geneve</p>
                        <p>Schweiz</p>
                        <Link className={s.link} href="https://www.infomaniak.com/de" target="_blank">https://www.infomaniak.com/de</Link>
                    </div>
                    <div className={s.containerItem}>
                        <strong className={s.strong}>Versionskontrolle & Quellcode</strong>
                        <p>GitHub, Inc.</p>
                        <p>88 Colin P Kelly Junior Street</p>
                        <p>San Francisco</p>
                        <p>California 94107</p>
                        <p>USA</p>
                        <Link className={s.link} href="https://github.com/m00gendai/msvs-next" target="_blank">https://github.com</Link>
                    </div>
                </div>
                <h3>Haftungsausschluss</h3>
                    <p>
                        Der Autor übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualität, 
                        Zuverlässigkeit und Vollständigkeit der Informationen.
                        <br />
                        <br />
                        Haftungsansprüche gegen den Autor wegen Schäden materieller oder immaterieller Art, 
                        welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen, 
                        durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden ausgeschlossen.
                        <br />
                        <br />
                        Alle hier bereitgestellten Informationen dienen lediglich Informationszwecken sowie Zwecken der 
                        Meinungsbildung. Eine Rechtsberatung findet nicht statt.
                        <br />
                        <br />
                        Die Matchschützenvereinigung Schaffhausen übernimmt keine Gewähr für die Aktualität, Korrektheit, Vollständigkeit oder 
                        Qualität der bereitgestellten Informationen.
                        <br />
                        <br />
                        Alle Angebote sind unverbindlich. Der Autor behält es sich ausdrücklich vor, 
                        Teile der Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, 
                        zu löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
                    </p>
                <h3>Haftung für Links</h3>
                    <p>
                        Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs.
                        Es wird jegliche Verantwortung für solche Webseiten abgelehnt. 
                        Der Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene Gefahr des Nutzers oder der Nutzerin.
                    </p>
                <h3>Urheberrechte</h3>
                    <p>
                        Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der Website 
                        gehören ausschliesslich der Matchschützenvereinigung Schaffhausen oder den speziell genannten Rechtsinhabern. 
                        Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der Urheberrechtsträger 
                        im Voraus einzuholen.
                    </p>
        </section>
        </main>

    </>
    )
}