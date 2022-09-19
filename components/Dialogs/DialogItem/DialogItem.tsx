import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './../Dialogs.module.css';
import {useAppSelector} from "../../../hooks/reduxToolkitHooks";

export const DialogItem = () => {
    const dialogs = useAppSelector(state => state.messagesPage.dialogs)

    let dialogsElements = dialogs.map(d => (
        <div key={d.id}>
            <img
                src='https://is3-ssl.mzstatic.com/image/thumb/Purple49/v4/c6/33/dd/c633dd45-95be-f814-bec6-9e84ee35d482/source/512x512bb.jpg' alt={'user'}/>
            <NavLink to={'/dialogs/' + d.id}>{d.name}</NavLink>
        </div>))

    return <div className={s.dialogsItem}>{dialogsElements}</div>
}
