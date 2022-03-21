import React from 'react';
import s from './../Dialogs.module.css';
import {MessagePropsType} from "./MessageContainer";
import {NewMessageForm} from "./NewMessageForm/NewMessageForm";

export function Message(props: MessagePropsType) {
    let messagesElements = props.messages.map(m => <div key={m.id}>{m.message}</div>)

    return (
        <div>
            <div className={s.message}>{messagesElements}</div>
            <NewMessageForm/>
        </div>
    )
}