import React from 'react';
import s from './Header.module.css';

export function Header() {
    return (
        <header className={s.header}>
            <img src={'https://assets.turbologo.com/blog/en/2018/03/19085254/prozrachniy-logo-1-800x575.png'}/>
        </header>
    )
}