import React from 'react';
import s from './../Dialogs.module.css';
import {NewMessageForm} from "./NewMessageForm/NewMessageForm";
import {useAppSelector} from "../../../hooks/reduxToolkitHooks";

export const Message = () => {
    const messages = useAppSelector(state => state.messagesPage.messages)

    let messagesElements = messages.map(m => <div key={m.id}>{m.message}</div>)

    return (
        <div>
            <div className={s.message}>{messagesElements}</div>
            <NewMessageForm/>
        </div>
    )
}