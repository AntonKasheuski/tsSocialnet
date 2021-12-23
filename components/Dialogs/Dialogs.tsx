import React from 'react';
import s from './Dialogs.module.css';
import {Message, messagePropsType} from "./Message/Message";
import {DialogItem, dialogPropsType} from "./DialogItem/DialogItem";

type dataPropsType = {
    dialogs: Array<dialogPropsType>
    messages: Array<messagePropsType>
}

export function Dialogs(props: dataPropsType) {

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