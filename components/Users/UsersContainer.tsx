import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    setCurrentPage,
    followUser,
    setUsers,
    unfollowUser,
    UsersPageType,
    UsersType, setTotalUsersCount, toggleFetching
} from "../../redux/users-reducer";
import React from "react";
import axios from "axios";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";


class UsersContainer extends React.Component<UsersPagePropsType> {
    componentDidMount() {
        this.props.toggleFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleFetching(false)
                this.props.setUsers(response.data.items)
                this.props.setTotalUsersCount(response.data.totalCount)
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.toggleFetching(true)
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`, {
            withCredentials: true,
        })
            .then(response => {
                this.props.toggleFetching(false)
                this.props.setUsers(response.data.items)
            });
    }

    followUser = (userId: number) => {
        this.props.toggleFetching(true)
        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {}, {
            withCredentials: true,
            headers: {
                "API-KEY": "61333b73-228a-45e4-880d-e33b8d4ecb29"
            }
        })
            .then(response => {
                this.props.toggleFetching(false)
                if (response.data.resultCode === 0) {
                    this.props.followUser(userId)
                } else {
                    alert(response.data.messages[0])
                }
            });
    }

    unfollowUser = (userId: number) => {
        this.props.toggleFetching(true)
        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${userId}`, {
            withCredentials: true,
            headers: {
                "API-KEY": "61333b73-228a-45e4-880d-e33b8d4ecb29"
            }
        })
            .then(response => {
                this.props.toggleFetching(false)
                if (response.data.resultCode === 0) {
                    this.props.unfollowUser(userId)
                } else {
                    alert(response.data.messages[0])
                }
            });
    }

    render() {
        return <>
            {this.props.isFetching
                ? <Preloader />
                : <Users totalUsersCount={this.props.totalUsersCount}
                         pageSize={this.props.pageSize}
                         currentPage={this.props.currentPage}
                         users={this.props.users}
                         followUser={this.followUser}
                         unfollowUser={this.unfollowUser}
                         onPageChanged={this.onPageChanged}
                />
            }
        </>
    }
}

type MapDispatchPropsType = {
    followUser: (userID: number) => void
    unfollowUser: (userID: number) => void
    setUsers: (users: UsersType) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
    toggleFetching: (isFetching: boolean) => void
}
export type UsersPagePropsType = UsersPageType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): UsersPageType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}

export default connect(mapStateToProps, {
    followUser,
    unfollowUser,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleFetching,
})(UsersContainer)