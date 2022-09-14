import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {logOut} from "../../redux/authSlice";
import {Preloader} from "../common/Preloader/Preloader";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

export function Header() {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const isFetching = useAppSelector(state => state.auth.isFetching)
    const login = useAppSelector(state => state.auth.login)
    const dispatch = useAppDispatch()

    const logOutHandler = () => {
        dispatch(logOut())
    }

    return (
        <header className={s.header}>
            <img src={'https://assets.turbologo.com/blog/en/2018/03/19085254/prozrachniy-logo-1-800x575.png'}/>
            <div className={s.loginBlock}>
                {isAuth
                    ? <>
                        {isFetching
                            ? <Preloader/>
                            : <>
                                <div>{login}</div>
                                <button onClick={logOutHandler}>Logout</button>
                            </>
                        }
                    </>
                    : <>
                        {isFetching
                            ? <Preloader/>
                            : <NavLink to={'/login'}>Login</NavLink>}
                    </>}
            </div>
        </header>
    )
}