import React from 'react';
import s from './Dialogs.module.css';
import {Navigate} from "react-router-dom";
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import {useAppSelector} from "../../hooks/reduxToolkitHooks";

export const Dialogs = () => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
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