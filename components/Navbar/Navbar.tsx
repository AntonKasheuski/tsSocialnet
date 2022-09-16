import React from 'react';
import s from './Navbar.module.css';
import {NavLink, useLocation} from 'react-router-dom';
import ProfileCard from "./ProfileCard/ProfileCard";
import {useAppSelector} from "../../hooks/hooks";

export function Navbar() {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const location = useLocation()

    let navArray = [
        {link: '/posts', name: 'Posts'},
        {link: '/profile', name: 'Profile'},
        {link: '/dialogs', name: 'Messages'},
        {link: '/users', name: 'Users'},
        {link: '/news', name: 'News'},
        {link: '/music', name: 'Music'},
        {link: '/settings', name: 'Settings'},
    ]

    return (
        <nav className={s.nav}>
            {isAuth && <ProfileCard />}
            {
                navArray.map(el => {
                    return <NavLink key={el.name} to={el.link}
                                    className={location.pathname === el.link ? s.activeLink : s.item}>
                            {location.pathname === el.link && <div className={s.activeLabel}></div>}
                            <div className={location.pathname === el.link ? s.activeText : s.text}>{el.name}</div>
                    </NavLink>
                })
            }
        </nav>
    )
}