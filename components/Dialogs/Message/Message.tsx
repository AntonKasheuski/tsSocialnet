import React from 'react';
import s from './../Dialogs.module.css';

export type messagePropsType = {
    id: number,
    message: string
}
type messagesPropsType = {
    messages: Array<messagePropsType>
}

export function Message(props: messagesPropsType) {

    let messagesElements = props.messages.map(m => <div>{m.message}</div>)

    return <div className={s.message}>{messagesElements}</div>
}

