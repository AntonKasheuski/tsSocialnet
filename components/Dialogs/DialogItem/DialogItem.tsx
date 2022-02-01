import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './../Dialogs.module.css';
import {DialogItemPropsType} from "./DialogItemContainer";

export function DialogItem(props: DialogItemPropsType) {

    let dialogsElements = props.dialogs.map(d => (
        <div>
            <img
                src='https://is3-ssl.mzstatic.com/image/thumb/Purple49/v4/c6/33/dd/c633dd45-95be-f814-bec6-9e84ee35d482/source/512x512bb.jpg'/>
            <NavLink to={'/dialogs/' + d.id}>{d.name}</NavLink>
        </div>))

    return <div className={s.dialogsItem}>{dialogsElements}</div>
}
