import React from 'react';
import s from './Dialogs.module.css';
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Navigate} from "react-router-dom";
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";

export const Dialogs = () => {
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
    if (!isAuth) return <Navigate replace to="/login"/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem/>
            </div>
            <div className={s.messages}>
                <Message/>
            </div>
        </div>
    )
}