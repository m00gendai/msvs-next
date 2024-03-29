import Link from "next/link"
import { useRouter } from 'next/router'
import Header from "../components/header"
import s from "../styles/Page.module.css"
import getFile from "../functions/getFile"
import extensionTrimmer from "../functions/extensionTrimmer"

export default function Gewehr(
    {
        setShow,
        resultCurrentYearDirectories,
        getResultFiles,
        getInvitationFiles
    }
    ){

    const date = new Date()
    const currentYear = date.getFullYear()
    const router = useRouter()
    const headUrl = `https://msvs.ch${router.pathname}`

    return(
        <>
        <Header title={"MSVS - Gewehr"} content={"MSVS Gewehr"} url={headUrl} />
        <main>
            <section className={s.section}>
                <h2>{`Gewehr`}</h2>
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
                                <div className={s.container}>
                                {
                                    getResultFiles.map(results =>{
                                        return results.data.map(result =>{
                                            if(result.parent_id == dir.id){
                                                return(
                                                    <div key={`Resultat_${result.id}`} onClick={()=> getFile(result.id, setShow)} className={s.item}>
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
                <Link className="archiv" href={`https://kdrive.infomaniak.com/app/share/608492/225d4d16-dff3-47ab-ae41-773504b219d5`} target={`_blank`} ><h3>Archiv</h3></Link>
            </section>
        </main>
        </>
    )
}

export async function getStaticProps() {

    const date = new Date()
    const currentYear = date.getFullYear()

    const getResultsCurrentYearDirectories = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/search?with=path&type=dir&query="${currentYear}"&directory_id=${process.env.KDRIVE_GEW_RES}`, {
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

    const getInvitationCurrentYearDirectories = await fetch(`https://api.infomaniak.com/2/drive/${process.env.KDRIVE_ROOT}/files/search?with=path&type=dir&query="${currentYear}"&directory_id=${process.env.KDRIVE_GEW_INV}`, {
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

    return { 
        props: {
            resultCurrentYearDirectories,
            getResultFiles,
            getInvitationFiles
        } , 
        revalidate: 10
    }
}