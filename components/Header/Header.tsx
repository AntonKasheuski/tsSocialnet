import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {AuthType} from "../../redux/auth-reducer";
import {Preloader} from "../common/Preloader/Preloader";

export function Header(props: AuthType & {
    logOutHandler: () => void
}) {
    return (
        <header className={s.header}>
            <img src={'https://assets.turbologo.com/blog/en/2018/03/19085254/prozrachniy-logo-1-800x575.png'}/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ? <>
                        <div>{props.login}</div>
                        <button onClick={props.logOutHandler}>Logout</button>
                    </>
                    : <>
                        {props.isFetching
                            ? <Preloader/>
                            : <NavLink to={'/login'}>Login</NavLink>}
                    </>}
            </div>
        </header>
    )
}