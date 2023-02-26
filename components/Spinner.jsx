import s from "../styles/Spinner.module.css"

export default function Spinner(){
  return (
    <div className={s.veil}>
        <div className={s.bg}></div>
        <div className={s.violet}></div>
        <div className={s.indigo}></div>
        <div className={s.blue}></div>
        <div className={s.green}></div>
        <div className={s.yellow}></div>
        <div className={s.orange}></div>
        <div className={s.red}></div> 
    </div>
  )
}
