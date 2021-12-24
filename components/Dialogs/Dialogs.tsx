import React from 'react';
import s from './Dialogs.module.css';
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";
import {MessagesPageType} from "../../redux/state";

type DialogsPropsType = {
    dialogsData: MessagesPageType
}

export function Dialogs(props: DialogsPropsType) {

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
               <DialogItem dialogs={props.dialogsData.dialogs} />
            </div>
            <div className={s.messages}>
                <Message messages={props.dialogsData.messages} />
            </div>
        </div>
    )
}