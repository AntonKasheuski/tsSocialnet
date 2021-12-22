import React from 'react';
import {NavLink} from 'react-router-dom';
import s from './Dialogs.module.css';

type dialogPropsType = {
    name: string;
    id: number;
}

type messagePropsType = {
    message: string;
}

const DialogItem = (props: dialogPropsType) => {
    return <div className={s.dialogsItem}>
        <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
    </div>
}

const Message = (props: messagePropsType) => {
    return <div className={s.message}>{props.message}</div>
}

export function Dialogs() {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem name={'Daria'} id={1}/>
                <DialogItem name={'Vasya'} id={2}/>
                <DialogItem name={'Petya'} id={3}/>
                <DialogItem name={'Sasha'} id={4}/>
                <DialogItem name={'Viktor'} id={5}/>
                <DialogItem name={'Antonio'} id={6}/>
            </div>
            <div className={s.messages}>
                <Message message={'Hi!'} />
                <Message message={'Hey!'} />
                <Message message={'Yo!'} />
                <Message message={'Yo!'} />
                <Message message={'Yo!'} />
            </div>
        </div>
    )
}