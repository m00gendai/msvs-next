"use client"

import { Popover } from "@radix-ui/themes"
import { GiLaurelCrown, GiLeeEnfield, GiLuger } from "react-icons/gi";
import { SlInfo, SlBookOpen, SlEnvolopeLetter, SlTrophy } from "react-icons/sl";
import s from "../styles/News.module.css"

export default function Info(){
    return(
        <Popover.Root>
  <Popover.Trigger>
    <div className={s.info} title={"Piktogramm-Erklärungen"}><SlInfo/></div>
  </Popover.Trigger>
  <Popover.Content style={{padding: 0}}>
    <div className={s.infoContent}>
        <div className={s.contentItem}><GiLeeEnfield /><p>Gewehr</p></div>
        <div className={s.contentItem}><GiLuger /><p>Pistole</p></div>
        <div className={s.contentItem}><GiLaurelCrown /><p>Kantonalcup</p></div>
        <div className={s.contentItem}><SlBookOpen /><p>Dokument</p></div>
        <div className={s.contentItem}><SlEnvolopeLetter /><p>Einladung</p></div>
        <div className={s.contentItem}><SlTrophy /><p>Resultat</p></div>
    </div>
  </Popover.Content>
</Popover.Root>

    )
}