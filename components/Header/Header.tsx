import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {logOut} from "../../redux/authSlice";
import {Preloader} from "../common/Preloader/Preloader";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import logo from "../../assets/images/site-logo.png";

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
            <div className={s.logoBlock}>
                <img src={logo} alt={'Site logo'} className={s.logo}/>
                <h3>Social Net</h3>
            </div>
            <input className={s.input} placeholder={"Search for user..."}></input>
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