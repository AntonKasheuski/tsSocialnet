import React from 'react';
import s from './Navbar.module.css';
import {NavLink, useLocation} from 'react-router-dom';
import ProfileCard from "./ProfileCard/ProfileCard";
import {useAppSelector} from "../../hooks/reduxToolkitHooks";

export function Navbar() {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const currentUserId = useAppSelector(state => state.profilePage.currentProfile.userId)

    const location = useLocation()
    const pathname = location.pathname.slice(1)
    const num = pathname.indexOf('/', 1)
    let slicedPathname: string
    if (num !== -1) {
        slicedPathname = pathname.slice(0, num)
    }

    let navArray = [
        {page: 'posts', link: '/posts', name: 'Posts'},
        {page: 'profile', link: '/profile/' + currentUserId, name: 'Profile'},
        {page: 'dialogs', link: '/dialogs', name: 'Messages'},
        {page: 'users', link: '/users', name: 'Users'},
        {page: 'news', link: '/news', name: 'News'},
        {page: 'music', link: '/music', name: 'Music'},
        {page: 'settings', link: '/settings', name: 'Settings'},
    ]

    return (
        <nav className={s.nav}>
            {isAuth &&
                <NavLink to={'/profile/' + currentUserId}>
                    <ProfileCard/>
                </NavLink>}
            {
                navArray.map(el => {
                    return <NavLink key={el.name} to={el.link}
                                    className={(slicedPathname || pathname) === el.page ? s.activeLink : s.item}>
                        {(slicedPathname || pathname) === el.page && <div className={s.activeLabel}></div>}
                        <div
                            className={(slicedPathname || pathname) === el.page ? s.activeText : s.text}>{el.name}</div>
                    </NavLink>
                })
            }
        </nav>
    )
}