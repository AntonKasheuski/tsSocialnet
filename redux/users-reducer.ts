const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT"

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
}

type FollowUserActionType = ReturnType<typeof followUserAC>
type UnfollowUserActionType = ReturnType<typeof unfollowUserAC>
type SetUsersActionType = ReturnType<typeof setUsersAC>
type SetCurrentPageType = ReturnType<typeof setCurrentPageAC>
type SetTotalUsersCountType = ReturnType<typeof setTotalUsersCountAC>
export type UsersActionType =
    FollowUserActionType
    | UnfollowUserActionType
    | SetUsersActionType
    | SetCurrentPageType
    | SetTotalUsersCountType

const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
}

export const usersReducer = (state: UsersPageType = initialState, action: UsersActionType): UsersPageType => {
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
            return {...state, totalUsersCount: action.totalUsersCount}
        default:
            return state;
    }
}

export const followUserAC = (userID: number) => {
    return {type: FOLLOW, userID} as const
}
export const unfollowUserAC = (userID: number) => {
    return {type: UNFOLLOW, userID} as const
}
export const setUsersAC = (users: UsersType) => {
    return {type: SET_USERS, users} as const
}
export const setCurrentPageAC = (currentPage: number) => {
    return {type: SET_CURRENT_PAGE, currentPage} as const
}
export const setTotalUsersCountAC = (totalUsersCount: number) => {
    return {type: SET_TOTAL_USERS_COUNT, totalUsersCount} as const
}