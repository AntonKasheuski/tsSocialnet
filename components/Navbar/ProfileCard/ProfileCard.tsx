import React, {useEffect} from 'react';
import s from './ProfileCard.module.css'
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import defaultUserPhoto from "../../../assets/images/default-user.png";
import {setCurrentProfile} from "../../../redux/profileSlice";

const ProfileCard = () => {
    const userPhoto = useAppSelector(state => state.profilePage.currentProfile.photo)
    const userName = useAppSelector(state => state.profilePage.currentProfile.fullName)
    const userStatus = useAppSelector(state => state.profilePage.currentProfile.status)
    const isDataLoaded = useAppSelector(state => state.profilePage.isDataLoaded)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(setCurrentProfile())
    }, [dispatch, isDataLoaded])

    return (
        <div className={s.main}>
            <img src={userPhoto ? userPhoto : defaultUserPhoto} className={s.userPhoto} alt={'user'}/>
            <div className={s.textBlock}>
                <div className={s.name}>{userName}</div>
                <div className={s.status}>{userStatus}</div>
            </div>
        </div>
    );
};

export default ProfileCard;