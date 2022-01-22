import React from 'react';
import s from './Dialogs.module.css';
import {MessageContainer} from "./Message/MessageContainer";
import {DialogItemContainer} from "./DialogItem/DialogItemContainer";

export function Dialogs() {

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