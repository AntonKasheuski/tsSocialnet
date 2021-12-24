import React from 'react';
import s from './../Dialogs.module.css';
import {MessageType} from "../../../redux/state";

type MessagesPropsType = {
    messages: Array<MessageType>
}

export function Message(props: MessagesPropsType) {

    let messagesElements = props.messages.map(m => <div>{m.message}</div>)

    return <div className={s.message}>{messagesElements}</div>
}

