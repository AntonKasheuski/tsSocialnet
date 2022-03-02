import React from 'react';
import s from './Dialogs.module.css';
import {MessageContainer} from "./Message/MessageContainer";
import {DialogItemContainer} from "./DialogItem/DialogItemContainer";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {Navigate} from "react-router-dom";

export function Dialogs() {
    const isAuth = useSelector<AppStateType, boolean>(state => state.auth.isAuth)
    if (!isAuth) return <Navigate replace to="/login"/>

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
               <DialogItemContainer />
            </div>
            <div className={s.messages}>
                <MessageContainer />
            </div>
        </div>
    )
}