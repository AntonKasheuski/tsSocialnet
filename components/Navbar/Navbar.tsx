import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from 'react-router-dom';

export function Navbar() {
    return (
        <nav className={s.nav}>
            <div className={s.navbarElement}>
                <NavLink to='/profile' className={navData => navData.isActive ? s.activeLink : s.item}>Profile</NavLink>
            </div>
            <div className={s.navbarElement}>
                <NavLink to='/dialogs' className={navData => navData.isActive ? s.activeLink : s.item}>Messages</NavLink>
            </div>
            <div className={s.navbarElement}>
                <NavLink to='/news' className={navData => navData.isActive ? s.activeLink : s.item}>News</NavLink>
            </div>
            <div className={s.navbarElement}>
                <NavLink to='/music' className={navData => navData.isActive ? s.activeLink : s.item}>Music</NavLink>
            </div>
            <div className={s.navbarElement}>
                <NavLink to='/settings' className={navData => navData.isActive ? s.activeLink : s.item}>Settings</NavLink>
            </div>
        </nav>
    )
}