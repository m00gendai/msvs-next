"use client"

import { Board } from "../interfaces"
import { SlClose, SlEnvolope, SlHome, SlPhone, SlScreenSmartphone } from "react-icons/sl"
import s from "../styles/Vorstand.module.css"
import { Popover } from "@radix-ui/themes"
import { Button } from "@radix-ui/themes"

interface Props{
    member: Board
}

export default function Vorstand_Info({member}:Props){

    return(
        <div className={s.details}>
            <div className={s.name}>{member.name}</div>
        <div className={s.iconRow}>
            <Popover.Root>
                <Popover.Trigger >
                    <Button variant="soft" color="mint">
                        <SlHome />
                    </Button>
                </Popover.Trigger>
                <Popover.Content className={s.info}>
                    <div className={s.address} dangerouslySetInnerHTML={{__html: member.address}}></div>
                </Popover.Content>
            </Popover.Root>
            {member.landline && member.landline.length !== 0 ?
            <Popover.Root>
                <Popover.Trigger>
                    <Button variant="soft" color="mint">
                        <SlPhone />
                    </Button>
                </Popover.Trigger>
                <Popover.Content className={s.info}>
                    <div className={s.contact}>{member.landline}</div>
                </Popover.Content>
            </Popover.Root> : null}
            {member.mobile && member.mobile.length !== 0 ?
            <Popover.Root>
                <Popover.Trigger>
                    <Button variant="soft" color="mint">
                        <SlScreenSmartphone />
                    </Button>
                </Popover.Trigger>
                <Popover.Content className={s.info}>
                    <div className={s.contact}>{member.mobile}</div>
                </Popover.Content>
            </Popover.Root> : null}
            {member.mail && member.mail.length !== 0 ? 
            <Popover.Root>
                <Popover.Trigger>
                    <Button variant="soft" color="mint">
                        <SlEnvolope />
                    </Button>
                </Popover.Trigger>
                <Popover.Content className={s.info}>
                    <div className={s.contact}>{member.mail}</div>
                </Popover.Content>
            </Popover.Root> : null}
        </div>
          </div>
    )
}