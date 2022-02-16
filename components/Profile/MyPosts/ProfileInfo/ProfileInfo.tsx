import React from 'react';
import s from "./ProfileInfo.module.css";
import {ProfileType} from "../../../../redux/profile-reducer";
import {Preloader} from "../../../common/Preloader/Preloader";
import defaultUserPhoto from "../../../../assets/images/default-user.png";

export function ProfileInfo(props: { profile: ProfileType }) {
    if (!props.profile) {
        return <Preloader />
    }

    return (
        <div>
            <div>
                <img src={'https://www.nycgovparks.org/facilities/images/beaches/coney-island-beach-content.jpg'}/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large ? props.profile.photos.large : defaultUserPhoto} className={s.userPhoto}/>
                <div className={s.userInfo}>
                    <div className={s.fullName}>{props.profile.fullName}</div>
                    <div className={s.aboutMe}>{props.profile.aboutMe}</div>
                    <hr/>
                    {props.profile.lookingForAJob
                        ? <div>Ищу работу: {props.profile.lookingForAJobDescription}</div>
                        : <div>Работаю в поте лица</div>
                    }
                    <hr/>
                    {props.profile.contacts.facebook
                        ? <div>facebook: {props.profile.contacts.facebook}</div>
                        : null
                    }
                    {props.profile.contacts.website
                        ? <div>website: {props.profile.contacts.website}</div>
                        : null
                    }
                    {props.profile.contacts.vk
                        ? <div>vk: {props.profile.contacts.vk}</div>
                        : null
                    }
                    {props.profile.contacts.twitter
                        ? <div>twitter: {props.profile.contacts.twitter}</div>
                        : null
                    }
                    {props.profile.contacts.instagram
                        ? <div>instagram: {props.profile.contacts.instagram}</div>
                        : null
                    }
                    {props.profile.contacts.youtube
                        ? <div>youtube: {props.profile.contacts.youtube}</div>
                        : null
                    }
                    {props.profile.contacts.github
                        ? <div>github: {props.profile.contacts.github}</div>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}