import React from 'react';
import s from './Dialogs.module.css';
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";
import {MessagesPageType} from "../../redux/state";

export function Dialogs(props: MessagesPageType) {

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
               <DialogItem dialogs={props.dialogs} />
            </div>
            <div className={s.messages}>
                <Message messages={props.messages} />
            </div>
        </div>
    )
}