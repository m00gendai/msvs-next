import Header from '../components/header'
import { useRouter } from 'next/router'
import s from "../styles/Vorstand.module.css"
import { boardmembers } from "../lib/vorstand"
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

export default function Vorstand(){

  const router = useRouter()
    const headUrl = `https://msvs.ch${router.pathname}`

    return(
        <>
      <Header title={"MSVS - Vorstand"} content={"MSVS - Vorstand"} url={headUrl} />
        <main>
        <section className={s.section}>
          <h2>Vorstand</h2> 
          <div className={s.container}>
            {
              boardmembers.map(member =>{
                const physicalAddress = member.where.split("<br>")
                const street = physicalAddress[0]
                const place = physicalAddress[1]
                return(
                  <div className={s.item} key={`member_${member.what}`}>
                    <h3>{member.what}</h3>
                    <h4>{member.who}</h4>
                    <div className={s.doxx}>
                      {member.where.length > 0 ? <div className={s.infoAds}><p>{street}</p><p>{place}</p></div> : null}
                      {member.mobile.length > 0 ? <div className={s.info}><PhoneAndroidIcon /><p>{member.mobile}</p></div> : null}
                      {member.landline.length > 0 ? <div className={s.info}><PhoneIcon /><p>{member.landline}</p></div> : null}
                      {member.mail.length > 0 ? <div className={s.info}><AlternateEmailIcon /><p>{member.mail}</p></div> : null}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </section>
        </main>

    </>
    )
}