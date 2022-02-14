import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    setCurrentPageAC,
    followUserAC,
    setUsersAC,
    unfollowUserAC,
    UsersPageType,
    UsersType, setTotalUsersCountAC
} from "../../redux/users-reducer";
import {Dispatch} from "redux";
import React from "react";
import axios from "axios";
import {Users} from "./Users";


class UsersContainer extends React.Component<UsersPagePropsType> {
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
        return <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      users={this.props.users}
                      followUser={this.props.followUser}
                      unfollowUser={this.props.unfollowUser}
                      onPageChanged={this.onPageChanged}
        />
    }
}

type MapDispatchPropsType = {
    followUser: (userID: number) => void
    unfollowUser: (userID: number) => void
    setUsers: (users: UsersType) => void
    setCurrentPage: (currentPage: number) => void
    setTotalUsersCount: (totalUsersCount: number) => void
}
export type UsersPagePropsType = UsersPageType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): UsersPageType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        followUser: (userID: number) => {
            dispatch(followUserAC(userID))
        },
        unfollowUser: (userID: number) => {
            dispatch(unfollowUserAC(userID))
        },
        setUsers: (users: UsersType) => {
            dispatch(setUsersAC(users))
        },
        setCurrentPage: (currentPage: number) => {
            dispatch(setCurrentPageAC(currentPage))
        },
        setTotalUsersCount: (totalUsersCount: number) => {
            dispatch(setTotalUsersCountAC(totalUsersCount))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)