import React from 'react';
import s from "./Users.module.css"
import defaultUserPhoto from "../../assets/images/default-user.png"
import {UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: UserType[]
    followingInProgressArray: number[]
    followUser: (userID: number) => void
    unfollowUser: (userID: number) => void
    onPageChanged: (p: number) => void
}

export const Users = (props: PropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span key={p}
                             className={props.currentPage === p ? s.selectedPage : ''}
                             onClick={() => props.onPageChanged(p)}
                >{p}|</span>
            })}
        </div>
        {props.users.map(u =>
            <div key={u.id} className={s.userItem}>
                <div className={s.avatarAndButton}>
                    <NavLink to={'/profile/' + u.id}>
                        <img src={u.photos.small ? u.photos.small : defaultUserPhoto} className={s.userPhoto}/>
                    </NavLink>
                    {u.followed
                        ? <button disabled={props.followingInProgressArray.some(id => id === u.id)}
                                  onClick={() => {
                                      props.unfollowUser(u.id)
                                  }}>Unfollow</button>
                        : <button disabled={props.followingInProgressArray.some(id => id === u.id)}
                                  onClick={() => {
                                      props.followUser(u.id)
                                  }}>Follow</button>}
                </div>
                <div className={s.userBlock}>
                    <div className={s.userNameAndStatus}>
                        <div>{u.name}</div>
                        <div style={{opacity: 0.5}}>{"u.status"}</div>
                    </div>
                    <div className={s.userLocation}>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </div>
                </div>
            </div>
        )}
    </div>
}