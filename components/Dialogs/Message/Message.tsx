import React, {ChangeEvent} from 'react';
import s from './../Dialogs.module.css';
import {MessagePropsType} from "./MessageContainer";

export function Message(props: MessagePropsType) {
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
            <textarea
                value={props.newMessageText}
                onChange={newTextHandler}
                placeholder={"Enter your text"}
            />
            <button onClick={addMessageHandler}>Add message</button>
        </div>
    )
}

