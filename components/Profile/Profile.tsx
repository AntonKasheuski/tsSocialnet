import React, {useEffect} from 'react';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Navigate, useLocation} from "react-router-dom";
import {ProfileStatus} from "./ProfileInfo/ProfileStatus";
import {getStatus, setCurrentUser} from "../../redux/profileSlice";

export function Profile() {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch()

    const location = useLocation()
    const pathname = location.pathname
    const num = pathname.indexOf('/', 1)
    const userId = pathname.slice(num + 1)

    useEffect(() => {
            dispatch(setCurrentUser(+userId))
            dispatch(getStatus(+userId))
    }, [dispatch, userId])

    if (!isAuth) return <Navigate replace to="/login"/>

    return (
        <div>
            <ProfileInfo/>
            <ProfileStatus/>
        </div>
    )
}