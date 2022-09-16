import React from 'react';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {useAppSelector} from "../../hooks/hooks";
import {Navigate} from "react-router-dom";

export function Profile() {
    const isAuth = useAppSelector(state => state.auth.isAuth)

    if (!isAuth) return <Navigate replace to="/login"/>

    return (
        <div>
            <ProfileInfo/>
        </div>
    )
}