import {usersAPI} from "../api/api";
import {AppThunk} from "./redux-store";

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT"
const TOGGLE_FETCHING = "TOGGLE-FETCHING"
const TOGGLE_FOLLOWING_IN_PROGRESS = "TOGGLE-FOLLOWING-IN-PROGRESS"

export type LocationType = {
    country: string
    city: string
}
type UserPhotosType = {
    small: string
    large: string
}
export type UserType = {
    id: number
    name: string
    photos: UserPhotosType
    status: string
    location: LocationType
    followed: boolean
}
export type UsersType = UserType[]
export type UsersPageType = {
    users: UsersType
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgressArray: (number)[]
}

type FollowUserActionType = ReturnType<typeof followUserAccept>
type UnfollowUserActionType = ReturnType<typeof unfollowUserAccept>
type SetUsersActionType = ReturnType<typeof setUsers>
type SetCurrentPageActionType = ReturnType<typeof setCurrentPage>
type SetTotalUsersCountActionType = ReturnType<typeof setTotalUsersCount>
type ToggleFetchingActionType = ReturnType<typeof toggleFetching>
type FollowingInProgressActionType = ReturnType<typeof toggleFollowingProgress>
export type UsersReducerActionType = FollowUserActionType
    | UnfollowUserActionType
    | SetUsersActionType
    | SetCurrentPageActionType
    | SetTotalUsersCountActionType
    | ToggleFetchingActionType
    | FollowingInProgressActionType

const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgressArray: [],
}

export const usersReducer = (state: UsersPageType = initialState, action: UsersReducerActionType): UsersPageType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)};
        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: false} : u)};
        case SET_USERS:
            return {...state, users: action.users};
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount};
        case TOGGLE_FETCHING:
            return {...state, isFetching: action.isFetching};
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state, followingInProgressArray: action.followingProgress
                    ? [...state.followingInProgressArray, action.userId]
                    : state.followingInProgressArray.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
}

export const followUserAccept = (userID: number) => {
    return {type: FOLLOW, userID} as const
}
export const unfollowUserAccept = (userID: number) => {
    return {type: UNFOLLOW, userID} as const
}
export const setUsers = (users: UsersType) => {
    return {type: SET_USERS, users} as const
}
export const setCurrentPage = (currentPage: number) => {
    return {type: SET_CURRENT_PAGE, currentPage} as const
}
export const setTotalUsersCount = (totalUsersCount: number) => {
    return {type: SET_TOTAL_USERS_COUNT, totalUsersCount} as const
}
export const toggleFetching = (isFetching: boolean) => {
    return {type: TOGGLE_FETCHING, isFetching} as const
}
export const toggleFollowingProgress = (followingProgress: boolean, userId: number) => {
    return {type: TOGGLE_FOLLOWING_IN_PROGRESS, followingProgress, userId} as const
}

export const getStartPageUsers = (currentPage: number, pageSize: number): AppThunk => (dispatch) => {
    dispatch(toggleFetching(true))
    usersAPI.getUsers(currentPage, pageSize)
        .then(response => {
            dispatch(toggleFetching(false))
            dispatch(setUsers(response.items))
            dispatch(setTotalUsersCount(response.totalCount))
        })
}
export const getSelectedPageUsers = (pageNumber: number, pageSize: number): AppThunk => (dispatch) => {
    dispatch(toggleFetching(true))
    dispatch(setCurrentPage(pageNumber))
    usersAPI.getUsers(pageNumber, pageSize)
        .then(response => {
            dispatch(toggleFetching(false))
            dispatch(setUsers(response.items))
        })
}
export const followUserTC = (userId: number): AppThunk => (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    usersAPI.followUser(userId)
        .then(response => {
            dispatch(toggleFollowingProgress(false, userId))
            if (response.resultCode === 0) {
                dispatch(followUserAccept(userId))
            } else {
                alert(response.messages[0])
            }
        })
}
export const unfollowUserTC = (userId: number): AppThunk => (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    usersAPI.unfollowUser(userId)
        .then(response => {
            dispatch(toggleFollowingProgress(false, userId))
            if (response.resultCode === 0) {
                dispatch(unfollowUserAccept(userId))
            } else {
                alert(response.messages[0])
            }
        })
}