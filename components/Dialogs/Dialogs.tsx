import React from 'react';
import s from './Dialogs.module.css';
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";
import {DialogType, MessageType} from "../../redux/state";

type DialogsPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageText: string
    newMessageTextUpdating: (newMessageText: string) => void
    addMessage: () => void
}

export function Dialogs(props: DialogsPropsType) {

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
               <DialogItem dialogs={props.dialogs} />
            </div>
            <div className={s.messages}>
                <Message
                    messages={props.messages}
                    newMessageText={props.newMessageText}
                    newMessageTextUpdating={props.newMessageTextUpdating}
                    addMessage={props.addMessage}
                />
            </div>
        </div>
    )
}