import React from 'react';
import s from './../Dialogs.module.css';
import {NewMessageForm} from "./NewMessageForm/NewMessageForm";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {MessageType} from "../../../redux/dialogs-reducer";

export const Message = () => {
    const messages = useSelector<AppStateType, MessageType[]>(state => state.messagesPage.messages)

    let messagesElements = messages.map(m => <div key={m.id}>{m.message}</div>)

    return (
        <div>
            <div className={s.message}>{messagesElements}</div>
            <NewMessageForm/>
        </div>
    )
}