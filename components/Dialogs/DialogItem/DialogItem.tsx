import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './../Dialogs.module.css';

type dialogPropsType = {
    name: string;
    id: number;
}

export function DialogItem(props: dialogPropsType) {
    return <div className={s.dialogsItem}>
        <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
    </div>
}
