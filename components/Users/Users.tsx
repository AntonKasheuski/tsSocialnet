import React from 'react';
import {UsersPagePropsType} from "./UsersContainer";
import s from "./Users.module.css"
import axios from "axios";
import defaultUserPhoto from "../../assets/images/default-user.png"

export class Users extends React.Component<UsersPagePropsType> {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            });
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)

        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }

        return <div>
            <div>
                {pages.map(p => {
                    return <span
                        className={this.props.currentPage === p ? s.selectedPage : ''}
                        onClick={() => this.onPageChanged(p)}
                    >|{p}|</span>
                })}
            </div>
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