import Head from 'next/head'
import Image from "next/image"
import s from '../styles/Home.module.css'
import Gruppenfoto from "../public/Gruppenfoto.jpg"
import Logo from "../public/logo.gif"
import News from "../components/News"

export default function Home() {
  return (
    <>
      <Head>
        <title>Matchschützenvereinigung Schaffhausen</title>
        <meta name="description" content="Matchschützenvereinigung Schaffhausen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 ><div className={s.logo}><Image src={Logo} fill /></div>Matchschützenvereinigung Schaffhausen</h1>
        <main>
          
        <section className={s.section}>
          <h2>Home</h2> 
          <div className={s.image}>
          <Image src={Gruppenfoto} fill/>   
          </div>        
            <div className={s.container}>
              <button className={s.button}>Kantonalcup</button>
              <button className={s.button}>Mitglied werden</button>
              <button className={s.buttonLong}>Jubiläum</button>
            </div>
        </section>
        <section className={s.news}>
          <News />
        </section>
        </main>

    </>
  )
}
