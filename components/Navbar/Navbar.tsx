import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from 'react-router-dom';

export function Navbar() {
    return (
        <nav className={s.nav}>
            <NavLink to='/profile' className={navData => navData.isActive ? s.activeLink : s.item}>
                <div className={s.navbarElement}>Profile</div>
            </NavLink>
            <NavLink to='/dialogs' className={navData => navData.isActive ? s.activeLink : s.item}>
                <div className={s.navbarElement}>Messages</div>
            </NavLink>
            <NavLink to='/users' className={navData => navData.isActive ? s.activeLink : s.item}>
                <div className={s.navbarElement}>Users</div>
            </NavLink>
            <NavLink to='/news' className={navData => navData.isActive ? s.activeLink : s.item}>
                <div className={s.navbarElement}>News</div>
            </NavLink>
            <NavLink to='/music' className={navData => navData.isActive ? s.activeLink : s.item}>
                <div className={s.navbarElement}>Music</div>
            </NavLink>
            <NavLink to='/settings'
                     className={navData => navData.isActive ? s.activeLink : s.item}>
                <div className={s.navbarElement}>Settings</div>
            </NavLink>
        </nav>
    )
}