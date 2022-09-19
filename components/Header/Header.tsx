import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {logOut} from "../../redux/authSlice";
import {Preloader} from "../common/Preloader/Preloader";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxToolkitHooks";
import logo from "../../assets/images/site-logo.png";
import {useDebounce} from "../../hooks/debounce";
import {getUsersForSearch} from "../../redux/usersSlice";
import {clearUsersFromSearching} from "../../redux/usersSlice"
import useComponentVisible from "../../hooks/useComponentVisible";

export function Header() {
    const usersFromSearching = useAppSelector(state => state.usersPage.usersFromSearching)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const isFetching = useAppSelector(state => state.auth.isFetching)
    const searchingFetching = useAppSelector(state => state.usersPage.searchingFetching)
    const dispatch = useAppDispatch()

    const [searchValue, setSearchValue] = useState('')
    const debouncedSearch = useDebounce(searchValue)

    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(true)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value)
    }

    const logOutHandler = () => {
        dispatch(logOut())
    }

    useEffect(() => {
        if (debouncedSearch.length > 2) {
            dispatch(getUsersForSearch(debouncedSearch))
        } else {
            usersFromSearching.length !== 0 && dispatch(clearUsersFromSearching())
        }
    }, [dispatch, debouncedSearch, usersFromSearching.length])

    return (
        <header className={s.header}>
            <div className={s.logoBlock}>
                <img src={logo} alt={'Site logo'} className={s.logo}/>
                <h3>Social Net</h3>
            </div>
            <div ref={ref} className={s.inputBlock}>
                <input className={s.input} placeholder={"Search for user..."} value={searchValue}
                       onChange={onChangeHandler} onClick={() => setIsComponentVisible(true)}/>
                {isComponentVisible && searchValue.length > 2 &&
                    <ul className={s.dropDown}>
                        {searchingFetching && <div className={s.loading}>Loading...</div>}
                        {!searchingFetching && usersFromSearching?.map(user => (
                            <NavLink to={'/profile/' + user.id}>
                                <li
                                    key={user.id}
                                    className={s.li}
                                    onClick={() => {
                                        setIsComponentVisible(false)
                                        setSearchValue('')
                                    }}
                                >{user.name}</li>
                            </NavLink>
                        ))}
                    </ul>}
            </div>
            <div className={s.loginBlock}>
                {isAuth
                    ? <>
                        {isFetching
                            ? <Preloader/>
                            : <>
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