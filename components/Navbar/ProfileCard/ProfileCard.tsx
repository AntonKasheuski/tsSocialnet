import React from 'react';
import s from './ProfileCard.module.css'
import {useAppSelector} from "../../../hooks/hooks";
import defaultUserPhoto from "../../../assets/images/default-user.png";

const ProfileCard = () => {
    let userPhoto = useAppSelector(state => state.profilePage.profile.photos.large)
    let userName = useAppSelector(state => state.profilePage.profile.fullName)
    let userStatus = useAppSelector(state => state.profilePage.status)

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