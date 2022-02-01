import React from 'react';
import {UsersPagePropsType} from "./UsersContainer";
import s from "./Users.module.css"

export const Users = (props: UsersPagePropsType) => {

    if (props.users.length === 0) {
        props.setUsers([
            {
                id: 1,
                fullName: "Dmitry K.",
                userPhoto: "https://www.matthewdevaney.com/wp-content/uploads/2021/08/powerapps-userphoto-featured-1.jpg",
                status: "I'm looking for a job right now...",
                location: {country: "Belarus", city: "Minsk"},
                followed: true
            },
            {
                id: 2,
                fullName: "Svetlana D.",
                userPhoto: "https://www.matthewdevaney.com/wp-content/uploads/2021/08/powerapps-userphoto-featured-1.jpg",
                status: "I'm so pretty",
                location: {country: "Belarus", city: "Minsk"},
                followed: true
            },
            {
                id: 3,
                fullName: "Sergei S.",
                userPhoto: "https://www.matthewdevaney.com/wp-content/uploads/2021/08/powerapps-userphoto-featured-1.jpg",
                status: "I like football!!!",
                location: {country: "Ukraine", city: "Kiev"},
                followed: false
            },
            {
                id: 4,
                fullName: "Andrew T.",
                userPhoto: "https://www.matthewdevaney.com/wp-content/uploads/2021/08/powerapps-userphoto-featured-1.jpg",
                status: "I'm free ti help you!",
                location: {country: "United States", city: "Philadelphia"},
                followed: false
            },
        ])
    }

    return (
        <div>
            {props.users.map(u =>
                <div key={u.id} className={s.userItem}>
                    <div className={s.avatarAndButton}>
                        <img src={u.userPhoto} className={s.userPhoto}/>
                        {u.followed
                            ? <button onClick={ () => {props.unfollowUser(u.id)} }>Unfollow</button>
                            : <button onClick={ () => {props.followUser(u.id)} }>Follow</button>}
                    </div>
                    <div className={s.userBlock}>
                        <div className={s.userNameAndStatus}>
                            <div>{u.fullName}</div>
                            <div>{u.status}</div>
                        </div>
                        <div className={s.userLocation}>
                            <div>{u.location.country}</div>
                            <div>{u.location.city}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}