import {usersAPI} from "../api/api";
import {AppThunk} from "./redux-store";

enum UsersActionType {
    FOLLOW = "Users/FOLLOW",
    UNFOLLOW = "Users/UNFOLLOW",
    SET_USERS = "Users/SET-USERS",
    SET_CURRENT_PAGE = "Users/SET-CURRENT-PAGE",
    SET_TOTAL_USERS_COUNT = "Users/SET-TOTAL-USERS-COUNT",
    TOGGLE_FETCHING = "Users/TOGGLE-FETCHING",
    TOGGLE_FOLLOWING_IN_PROGRESS = "Users/TOGGLE-FOLLOWING-IN-PROGRESS",
}

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
export type UsersPageType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgressArray: (number)[]
}

const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgressArray: [],
}

export type UsersReducerActionType = FollowUserActionType
    | UnfollowUserActionType
    | SetUsersActionType
    | SetCurrentPageActionType
    | SetTotalUsersCountActionType
    | ToggleFetchingActionType
    | FollowingInProgressActionType
export const usersReducer = (state: UsersPageType = initialState, action: UsersReducerActionType): UsersPageType => {
    switch (action.type) {
        case UsersActionType.FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)};
        case UsersActionType.UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: false} : u)};
        case UsersActionType.SET_USERS:
            return {...state, users: action.users};
        case UsersActionType.SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};
        case UsersActionType.SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount};
        case UsersActionType.TOGGLE_FETCHING:
            return {...state, isFetching: action.isFetching};
        case UsersActionType.TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state, followingInProgressArray: action.followingProgress
                    ? [...state.followingInProgressArray, action.userId]
                    : state.followingInProgressArray.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
}

type FollowUserActionType = ReturnType<typeof followUserAccept>
export const followUserAccept = (userID: number) => {
    return {type: UsersActionType.FOLLOW, userID} as const
}
type UnfollowUserActionType = ReturnType<typeof unfollowUserAccept>
export const unfollowUserAccept = (userID: number) => {
    return {type: UsersActionType.UNFOLLOW, userID} as const
}
type SetUsersActionType = ReturnType<typeof setUsers>
export const setUsers = (users: UserType[]) => {
    return {type: UsersActionType.SET_USERS, users} as const
}
type SetCurrentPageActionType = ReturnType<typeof setCurrentPage>
export const setCurrentPage = (currentPage: number) => {
    return {type: UsersActionType.SET_CURRENT_PAGE, currentPage} as const
}
type SetTotalUsersCountActionType = ReturnType<typeof setTotalUsersCount>
export const setTotalUsersCount = (totalUsersCount: number) => {
    return {type: UsersActionType.SET_TOTAL_USERS_COUNT, totalUsersCount} as const
}
type ToggleFetchingActionType = ReturnType<typeof toggleFetching>
export const toggleFetching = (isFetching: boolean) => {
    return {type: UsersActionType.TOGGLE_FETCHING, isFetching} as const
}
type FollowingInProgressActionType = ReturnType<typeof toggleFollowingProgress>
export const toggleFollowingProgress = (followingProgress: boolean, userId: number) => {
    return {type: UsersActionType.TOGGLE_FOLLOWING_IN_PROGRESS, followingProgress, userId} as const
}

export const getStartPageUsers = (currentPage: number, pageSize: number): AppThunk => async (dispatch) => {
    dispatch(toggleFetching(true))
    let response = await usersAPI.getUsers(currentPage, pageSize)
    dispatch(toggleFetching(false))
    dispatch(setUsers(response.items))
    dispatch(setTotalUsersCount(response.totalCount))
}
export const getSelectedPageUsers = (pageNumber: number, pageSize: number): AppThunk => async (dispatch) => {
    dispatch(toggleFetching(true))
    dispatch(setCurrentPage(pageNumber))
    let response = await usersAPI.getUsers(pageNumber, pageSize)
    dispatch(toggleFetching(false))
    dispatch(setUsers(response.items))
}
export const followUserTC = (userId: number): AppThunk => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await usersAPI.followUser(userId)
    dispatch(toggleFollowingProgress(false, userId))
    if (response.resultCode === 0) {
        dispatch(followUserAccept(userId))
    } else {
        alert(response.messages[0])
    }
}
export const unfollowUserTC = (userId: number): AppThunk => async (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId))
    let response = await usersAPI.unfollowUser(userId)
    dispatch(toggleFollowingProgress(false, userId))
    if (response.resultCode === 0) {
        dispatch(unfollowUserAccept(userId))
    } else {
        alert(response.messages[0])
    }
}