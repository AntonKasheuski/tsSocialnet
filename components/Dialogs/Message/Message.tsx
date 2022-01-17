import React, {ChangeEvent} from 'react';
import s from './../Dialogs.module.css';
import {MessageType} from "../../../redux/state";
import {
    addMessageActionCreator,
    AddMessagePropsType,
    newMessageTextUpdatingActionCreator,
    NewMessageTextUpdatingPropsType,
} from "../../../redux/dialogs-reducer";

type MessagesPropsType = {
    messages: Array<MessageType>
    newMessageText: string
    dispatch: (action: NewMessageTextUpdatingPropsType | AddMessagePropsType) => void
}

export function Message(props: MessagesPropsType) {
    let messagesElements = props.messages.map(m => <div key={m.id}>{m.message}</div>)

    const newTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // props.newMessageTextUpdating(e.currentTarget.value)
        props.dispatch(newMessageTextUpdatingActionCreator(e.currentTarget.value))
    }

    const addMessageHandler = () => {
        // props.addMessage()
        props.dispatch(addMessageActionCreator())
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

