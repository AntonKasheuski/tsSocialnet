import React, {useEffect} from 'react';
import s from "./ProfileInfo.module.css";
import {Preloader} from "../../common/Preloader/Preloader";
import defaultUserPhoto from "../../../assets/images/default-user.png";
import {ProfileStatus} from "./ProfileStatus";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {getStatus, setCurrentUser} from "../../../redux/profileSlice";

export function ProfileInfo() {
    const userId = useAppSelector(state => state.auth.userId)
    const profile = useAppSelector(state => state.profilePage.profile)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setCurrentUser(userId))
        dispatch(getStatus(userId))
    }, [dispatch, userId])

    if (!profile.fullName) {
        return <Preloader />
    } else {
        return (
            <div>
                <div>
                    <img src={'https://www.nycgovparks.org/facilities/images/beaches/coney-island-beach-content.jpg'}/>
                </div>
                <div className={s.descriptionBlock}>
                    <img src={profile.photos.large ? profile.photos.large : defaultUserPhoto} className={s.userPhoto}/>
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
                <ProfileStatus/>
            </div>
        )
    }
}