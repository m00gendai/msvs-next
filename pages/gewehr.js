import Head from 'next/head'
import s from "../styles/Page.module.css"

export default function Gewehr(){
    return(
        <>
      <Head>
        <title>Matchschützenvereinigung Schaffhausen</title>
        <meta name="description" content="Matchschützenvereinigung Schaffhausen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main>
        <section className={s.section}>
          <h2>Gewehr</h2> 
          <h3>Einladungen</h3>
          <h3>Resultate</h3>
        </section>
        </main>

    </>
    )
}