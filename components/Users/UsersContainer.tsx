import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    setCurrentPage,
    followUser,
    setUsers,
    unfollowUser,
    UsersPageType,
    UsersType, setTotalUsersCount, toggleFetching, toggleFollowingProgress
} from "../../redux/users-reducer";
import React from "react";
import {Users} from "./Users";
import {followAPI, usersAPI} from "../../api/api";
import {Preloader} from "../common/Preloader/Preloader";


class UsersContainer extends React.Component<UsersPagePropsType> {
    componentDidMount() {
        this.props.toggleFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(response => {
                this.props.toggleFetching(false)
                this.props.setUsers(response.items)
                this.props.setTotalUsersCount(response.totalCount)
            });
    }

    onPageChanged = (pageNumber: number) => {
        this.props.toggleFetching(true)
        this.props.setCurrentPage(pageNumber)
        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(response => {
                this.props.toggleFetching(false)
                this.props.setUsers(response.items)
            });
    }

    followUser = (userId: number) => {
        this.props.toggleFollowingProgress(true, userId)
        followAPI.followUser(userId)
            .then(response => {
                this.props.toggleFollowingProgress(false, userId)
                if (response.resultCode === 0) {
                    this.props.followUser(userId)
                } else {
                    alert(response.messages[0])
                }
            });
    }

    unfollowUser = (userId: number) => {
        this.props.toggleFollowingProgress(true, userId)
        followAPI.unfollowUser(userId)
            .then(response => {
                this.props.toggleFollowingProgress(false, userId)
                if (response.resultCode === 0) {
                    this.props.unfollowUser(userId)
                } else {
                    alert(response.messages[0])
                }
            });
    }

    render() {
        return <>
            {this.props.isFetching
            ? <Preloader/>
            : <Users totalUsersCount={this.props.totalUsersCount}
                     pageSize={this.props.pageSize}
                     currentPage={this.props.currentPage}
                     users={this.props.users}
                     followingInProgressArray={this.props.followingInProgressArray}
                     followUser={this.followUser}
                     unfollowUser={this.unfollowUser}
                     onPageChanged={this.onPageChanged}
                />}
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
    toggleFollowingProgress: (followingProgress: boolean, userId: number) => void
}
export type UsersPagePropsType = UsersPageType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): UsersPageType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgressArray: state.usersPage.followingInProgressArray,
    }
}

export default connect(mapStateToProps, {
    followUser,
    unfollowUser,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleFetching,
    toggleFollowingProgress,
})(UsersContainer)