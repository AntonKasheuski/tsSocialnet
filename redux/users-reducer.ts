const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"
const SET_CURRENT_PAGE = "SET-CURRENT-PAGE"
const SET_TOTAL_USERS_COUNT = "SET-TOTAL-USERS-COUNT"
const TOGGLE_FETCHING = "TOGGLE-FETCHING"

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
}

type FollowUserActionType = ReturnType<typeof followUser>
type UnfollowUserActionType = ReturnType<typeof unfollowUser>
type SetUsersActionType = ReturnType<typeof setUsers>
type SetCurrentPageType = ReturnType<typeof setCurrentPage>
type SetTotalUsersCountType = ReturnType<typeof setTotalUsersCount>
type ToggleFetchingType = ReturnType<typeof toggleFetching>
export type UsersActionType =
    FollowUserActionType
    | UnfollowUserActionType
    | SetUsersActionType
    | SetCurrentPageType
    | SetTotalUsersCountType
    | ToggleFetchingType

const initialState = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
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
            return {...state, totalUsersCount: action.totalUsersCount};
        case TOGGLE_FETCHING:
            return {...state, isFetching: action.isFetching};
        default:
            return state;
    }
}

export const followUser = (userID: number) => {
    return {type: FOLLOW, userID} as const
}
export const unfollowUser = (userID: number) => {
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