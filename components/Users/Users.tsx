import React from 'react';
import {UsersPagePropsType} from "./UsersContainer";
import s from "./Users.module.css"
import axios from "axios";
import defaultUserPhoto from "../../assets/images/default-user.png"

export class Users extends React.Component<UsersPagePropsType> {
    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
            this.props.setUsers(response.data.items)
        });
    }

    render() {
        return <div>
            {this.props.users.map(u =>
                <div key={u.id} className={s.userItem}>
                    <div className={s.avatarAndButton}>
                        <img src={u.photos.small ? u.photos.small : defaultUserPhoto} className={s.userPhoto}/>
                        {u.followed
                            ? <button onClick={() => {
                                this.props.unfollowUser(u.id)
                            }}>Unfollow</button>
                            : <button onClick={() => {
                                this.props.followUser(u.id)
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
}