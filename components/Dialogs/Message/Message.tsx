import React, {ChangeEvent} from 'react';
import s from './../Dialogs.module.css';
import {MessageType} from "../../../redux/state";

type MessagesPropsType = {
    messages: Array<MessageType>
    newMessageText: string
    newMessageTextUpdating: (newMessageText: string) => void
    addMessage: () => void
}

export function Message(props: MessagesPropsType) {

    let messagesElements = props.messages.map(m => <div key={m.id}>{m.message}</div>)

    const newTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.newMessageTextUpdating(e.currentTarget.value)
    }

    const addMessageHandler = () => {
        props.addMessage()
    }

    return (
        <div>
            <div className={s.message}>{messagesElements}</div>
            <textarea value={props.newMessageText} onChange={newTextHandler}></textarea>
            <button onClick={addMessageHandler}>Add message</button>
        </div>
    )
}

