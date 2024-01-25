import Link from "next/link"
import { useRouter } from 'next/router'
import Header from "../components/header"
import s from "../styles/Page.module.css"
import getFile from "../functions/getFile"
import extensionTrimmer from "../functions/extensionTrimmer"

export default function Luft(
    {
        setShow,
        resultCurrentYearDirectories,
        getResultFiles,
        getInvitationFiles,
        winterMastersSeasons,
        getWinterMastersFiles,
        images
    }
    ){

    const date = new Date()
    const currentYear = date.getFullYear()
    const router = useRouter()
    const headUrl = `https://msvs.ch${router.pathname}`

    return(
        <>
        <Header title={"MSVS - Luft"} content={"MSVS Luft"} url={headUrl} />
        <main>
            <section className={s.section}>
                <h2>{`Luft`}</h2>
                <h3>{`Einladungen`}</h3>
                <div className={s.results}>
                  {
                    getInvitationFiles.length !== 0 ? 
                      <div className={s.container}>
                          {
                              getInvitationFiles.map(invitations =>{
                                  return invitations.data.map(invitation=>{
                                      return(
                                          <div key={`invitation_${invitation.id}`} onClick={()=> getFile(invitation.id, setShow)} className={s.item}>
                                              <div className={s.text}>
                                                  {extensionTrimmer(invitation.name)}
                                              </div>
                                          </div>
                                      )
                                  })
                              })
                          }
                      </div>
                    :
                    <p>{`Noch keine Einladungen für ${currentYear}`}</p>
                  }
                </div>
                <h3>{`Wintermeisterschaft`}</h3>
                {
                    winterMastersSeasons.data.length === 0 ? 
                    <div className={s.results}>
                        <p>{`Keine Wintermeisterschaft?`}</p>
                    </div>
                    :
                    winterMastersSeasons.data.map(dir =>{
                        return (
                            <div className={s.results} key={`WM_${dir.id}`}>
                                <h4>{dir.path.split("/")[dir.path.split("/").length-1]}</h4>
                                <div className={s.container}>
                                {
                                    getWinterMastersFiles.map(results =>{
                                        return results.data.map(result =>{
                                            if(result.parent_id == dir.id){
                                                return(
                                                    <div key={`WM_${result.id}`} onClick={()=> getFile(result.id, setShow)} className={s.item}>
                                                        <div className={s.text}>
                                                            {extensionTrimmer(result.name)}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        })
                                    })
                                }
                                </div>
                            </div>
                        )
                    })
                 }
                <h3>{`Resultate`}</h3>
                {
                    resultCurrentYearDirectories.data.length === 0 ? 
                        <div className={s.results}>
                            <p>{`Noch keine Resultate von ${currentYear}`}</p>
                        </div>
                    :
                    resultCurrentYearDirectories.data.map(dir =>{
                        return (
                            <div className={s.results} key={`Resultate_${dir.id}`}>
                                <h4>{dir.path.split("/")[dir.path.split("/").length-2]}</h4>
                                <div className={s.imageContainer}>
                                  {
                                    images.map(img =>{
                                      if(img.parent == dir.id){
                                        return <img className={s.image} src={`data:$;base64, ${img.string}`} key={`imageItem_${img.id}`}/>
                                      }
                                })
                                  }
                                </div>
                                <div className={s.container}>
                                {
                                    getResultFiles.map(results =>{
                                        return results.data.map(result =>{
                                            if(result.parent_id == dir.id){
                                              if(result.extension_type !== "image"){
                                                return(
                                                    <div key={`Resultat_${result.id}`} onClick={()=> getFile(result.id, setShow)} className={s.item}>
                                                        <div className={s.text}>
                                                            {extensionTrimmer(result.name)}
                                                        </div>
                                                    </div>
                                                )
                                              }
                                            }
                                        })
                                    })
                                }
                                </div>
                            </div>
                        )
                    })
                 }
                <Link className="archiv" href={`https://kdrive.infomaniak.com/app/share/608492/225d4d16-dff3-47ab-ae41-773504b219d5`} target={`_blank`} ><h3>Archiv</h3></Link>
            </section>
        </main>
        </>
    )
}

export async function getStaticProps() {

    const date = new Date()
    const currentYear = date.getFullYear()

    const getResultsCurrentYearDirectories = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/search?with=path&type=dir&query="${currentYear}"&directory_id=${process.env.KDRIVE_AIR_RES}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },
    })

    const resultCurrentYearDirectories = await getResultsCurrentYearDirectories.json()

    const getResultFiles = await Promise.all(resultCurrentYearDirectories.data.map(async dir =>{
        const getDirectoryFiles = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/${dir.id}/files`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.KDRIVE}`,
                "Content-Type" : "application/json"
            },
        })
        return await getDirectoryFiles.json()
    }))

    const getInvitationCurrentYearDirectories = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/search?with=path&type=dir&query="${currentYear}"|"${currentYear-1}"&directory_id=${process.env.KDRIVE_AIR_INV}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },
    })

    const invitationCurrentYearDirectories = await getInvitationCurrentYearDirectories.json()

    const getInvitationFiles = await Promise.all(invitationCurrentYearDirectories.data.map(async dir =>{
        const getDirectoryFiles = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/${dir.id}/files`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.KDRIVE}`,
                "Content-Type" : "application/json"
            },
        })
        return await getDirectoryFiles.json()
    }))

    const getWinterMastersSeasons = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/search?with=path&type=dir&query="${currentYear}"&directory_id=${process.env.KDRIVE_AIR_WM}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${process.env.KDRIVE}`,
            "Content-Type" : "application/json"
        },
    })

    const winterMastersSeasons = await getWinterMastersSeasons.json()

    const getWinterMastersFiles = await Promise.all(winterMastersSeasons.data.map(async dir =>{
        const getDirectoryFiles = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/${dir.id}/files`,{
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.KDRIVE}`,
                "Content-Type" : "application/json"
            },
        })
        return await getDirectoryFiles.json()
    }))

    const getResultImages = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/search?directory_id=${process.env.KDRIVE_AIR_RES}&depth=unlimited&per_page=1000&types[]=image`, {
      method: "GET",
      headers: {
          Authorization: `Bearer ${process.env.KDRIVE}`,
          "Content-Type" : "application/json"
      },

  })
  const resultImages = await getResultImages.json()

  // Gets preview Image object for each image file
  const images = await Promise.all(resultImages.data.map(async image =>{
      let getImg = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/${image.id}/preview`, {
          method: "GET",
          headers: {
              Authorization: `Bearer ${process.env.KDRIVE}`,
              "Content-Type" : "application/json"
          },
      })
      // Magic by https://stackoverflow.com/questions/72036447/createobjecturl-error-argument-must-be-an-instance-of-blob-received-an-instan
      getImg = await getImg.arrayBuffer()
      const img = Buffer.from(getImg).toString("base64")
      return {id: image.id, parent: image.parent_id, string: img}
  }))

    return { 
        props: {
            resultCurrentYearDirectories,
            getResultFiles,
            getInvitationFiles,
            winterMastersSeasons,
            getWinterMastersFiles,
            images
        } , 
        revalidate: 10
    }
}