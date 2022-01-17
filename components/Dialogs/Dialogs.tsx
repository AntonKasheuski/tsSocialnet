import React from 'react';
import s from './Dialogs.module.css';
import {Message} from "./Message/Message";
import {DialogItem} from "./DialogItem/DialogItem";
import {DialogType, MessageType} from "../../redux/state";
import {AddMessagePropsType, NewMessageTextUpdatingPropsType} from "../../redux/dialogs-reducer";

type DialogsPropsType = {
    dialogs: Array<DialogType>
    messages: Array<MessageType>
    newMessageText: string
    dispatch: (action: NewMessageTextUpdatingPropsType | AddMessagePropsType) => void
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
                    dispatch={props.dispatch}
                />
            </div>
        </div>
    )
}