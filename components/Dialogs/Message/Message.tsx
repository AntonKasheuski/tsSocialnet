import React from 'react';
import s from './../Dialogs.module.css';

type messagePropsType = {
    message: string;
}

export function Message(props: messagePropsType) {
    return <div className={s.message}>{props.message}</div>
}
