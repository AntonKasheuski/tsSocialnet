import React from 'react';
import s from './../Dialogs.module.css';
import {MessageType} from "../../../redux/state";

type MessagesPropsType = {
    messages: Array<MessageType>
}

export function Message(props: MessagesPropsType) {

    let messagesElements = props.messages.map(m => <div>{m.message}</div>)

    let newMessageTextRef = React.createRef<HTMLTextAreaElement>()

    const addMessage = () => {
        alert(newMessageTextRef.current?.value)
    }

    return (
        <div>
            <div className={s.message}>{messagesElements}</div>
            <textarea ref={newMessageTextRef}></textarea>
            <button onClick={addMessage}>Add message</button>
        </div>
    )
}

