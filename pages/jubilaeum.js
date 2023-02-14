import Head from 'next/head'
import s from "../styles/Page.module.css"

export default function Jubiläum(){
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
          <h2>Jubiläum</h2> 
        </section>
        </main>

    </>
    )
}