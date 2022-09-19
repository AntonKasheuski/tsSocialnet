import React, {useEffect} from 'react';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxToolkitHooks";
import {Navigate, useLocation} from "react-router-dom";
import {ProfileStatus} from "./ProfileInfo/ProfileStatus";
import {getStatus, setUser} from "../../redux/profileSlice";
import {ImageUploader} from "../../features/imageUploader/ImageUploader";

export function Profile() {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const currentUserId = useAppSelector(state => state.profilePage.currentProfile.userId)
    const dispatch = useAppDispatch()

    const location = useLocation()
    const pathname = location.pathname
    const num = pathname.indexOf('/', 1)
    const userId = pathname.slice(num + 1)

    useEffect(() => {
            dispatch(setUser(+userId))
            dispatch(getStatus(+userId))
    }, [dispatch, userId])

    if (!isAuth) return <Navigate replace to="/login"/>

    return (
        <div>
            <ProfileInfo/>
            {currentUserId === +userId && <ImageUploader/>}
            <ProfileStatus userId={userId}/>
        </div>
    )
}