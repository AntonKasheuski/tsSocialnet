import React from 'react';
import s from "./Users.module.css"
import defaultUserPhoto from "../../assets/images/default-user.png"
import {followUserTC, unfollowUserTC, UserType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";

export const Users = () => {
    const users = useSelector<AppStateType, UserType[]>(state => state.usersPage.users)
    const followingInProgressArray = useSelector<AppStateType, number[]>(state => state.usersPage.followingInProgressArray)
    const dispatch = useDispatch()

    const followUser = (userId: number) => {
        dispatch(followUserTC(userId))
    }
    const unfollowUser = (userId: number) => {
        dispatch(unfollowUserTC(userId))
    }

    return <div>
        {users.map(u =>
            <div key={u.id} className={s.userItem}>
                <div className={s.avatarAndButton}>
                    <NavLink to={'/profile/' + u.id}>
                        <img src={u.photos.small ? u.photos.small : defaultUserPhoto} className={s.userPhoto}/>
                    </NavLink>
                    {u.followed
                        ? <button disabled={followingInProgressArray.some(id => id === u.id)}
                                  onClick={() => {
                                      unfollowUser(u.id)
                                  }}>Unfollow</button>
                        : <button disabled={followingInProgressArray.some(id => id === u.id)}
                                  onClick={() => {
                                      followUser(u.id)
                                  }}>Follow</button>}
                </div>
                <div className={s.userBlock}>
                    <div className={s.userNameAndStatus}>
                        <div>{u.name}</div>
                        <div style={{opacity: 0.5}}>{u.status}</div>
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