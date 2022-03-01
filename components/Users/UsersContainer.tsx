import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    UsersPageType,
    getStartPageUsers,
    getSelectedPageUsers,
    followUser,
    unfollowUser
} from "../../redux/users-reducer";
import React from "react";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";


class UsersContainer extends React.Component<UsersPagePropsType> {
    componentDidMount() {
        this.props.getStartPageUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getSelectedPageUsers(pageNumber, this.props.pageSize)
    }

    followUser = (userId: number) => {
        this.props.followUser(userId)
    }

    unfollowUser = (userId: number) => {
        this.props.unfollowUser(userId)
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
    getStartPageUsers: (currentPage: number, pageSize: number) => void
    getSelectedPageUsers: (pageNumber: number, pageSize: number) => void
    followUser: (userID: number) => void
    unfollowUser: (userID: number) => void
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
    getStartPageUsers,
    getSelectedPageUsers,
    followUser,
    unfollowUser
})(UsersContainer)