import React from 'react';
import s from "./Users.module.css"
import defaultUserPhoto from "../../assets/images/default-user.png"
import {followUser, unfollowUser} from "../../redux/usersSlice";
import {NavLink} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

export const Users = () => {
    const users = useAppSelector(state => state.usersPage.users)
    const followingInProgressArray = useAppSelector(state => state.usersPage.followingInProgressArray)
    const dispatch = useAppDispatch()

    const followUserHandler = (userId: number) => {
        dispatch(followUser(userId))
    }
    const unfollowUserHandler = (userId: number) => {
        dispatch(unfollowUser(userId))
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
                                      unfollowUserHandler(u.id)
                                  }}>Unfollow</button>
                        : <button disabled={followingInProgressArray.some(id => id === u.id)}
                                  onClick={() => {
                                      followUserHandler(u.id)
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