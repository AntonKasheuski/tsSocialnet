import React from 'react';
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import defaultUserPhoto from "../../../assets/images/default-user.png";
import {useAppSelector} from "../../../hooks/hooks";

export function ProfileInfo() {
    const profile = useAppSelector(state => state.profilePage.profile)

    if (!profile.fullName) {
        return <Preloader/>
    } else {
        return (
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large ? profile.photos.large : defaultUserPhoto} alt={'avatar'} className={s.userPhoto}/>
                <div className={s.userInfo}>
                    <div className={s.fullName}>{profile.fullName}</div>
                    <div className={s.aboutMe}>{profile.aboutMe}</div>
                    <hr/>
                    {profile.lookingForAJob
                        ? <div>Ищу работу: {profile.lookingForAJobDescription}</div>
                        : <div>Работаю в поте лица</div>
                    }
                    <hr/>
                    {profile.contacts.facebook
                        ? <div>facebook: {profile.contacts.facebook}</div>
                        : null
                    }
                    {profile.contacts.website
                        ? <div>website: {profile.contacts.website}</div>
                        : null
                    }
                    {profile.contacts.vk
                        ? <div>vk: {profile.contacts.vk}</div>
                        : null
                    }
                    {profile.contacts.twitter
                        ? <div>twitter: {profile.contacts.twitter}</div>
                        : null
                    }
                    {profile.contacts.instagram
                        ? <div>instagram: {profile.contacts.instagram}</div>
                        : null
                    }
                    {profile.contacts.youtube
                        ? <div>youtube: {profile.contacts.youtube}</div>
                        : null
                    }
                    {profile.contacts.github
                        ? <div>github: {profile.contacts.github}</div>
                        : null
                    }
                </div>
            </div>
        )
    }
}