import React from 'react';
import s from './../Dialogs.module.css';
import {MessageType} from "../../../redux/state";


export function Message(props: Array<MessageType>) {

    let messagesElements = props.map(m => <div>{m.message}</div>)

    return <div className={s.message}>{messagesElements}</div>
}

