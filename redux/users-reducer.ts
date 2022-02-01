const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"

export type LocationType = {
    country: string
    city: string
}
export type UserType = {
    id: number
    fullName: string
    userPhoto: string
    status: string
    location: LocationType
    followed: boolean
}
export type UsersType = UserType[]
export type UsersPageType = {
    users: UsersType
}

type FollowUserActionType = ReturnType<typeof followUserAC>
type UnfollowUserActionType = ReturnType<typeof unfollowUserAC>
type SetUsersActionType = ReturnType<typeof setUsersAC>
export type UsersActionType = FollowUserActionType | UnfollowUserActionType | SetUsersActionType

const initialState = {
    users: [ ]
}

export const usersReducer = (state: UsersPageType = initialState, action: UsersActionType): UsersPageType => {
    switch (action.type) {
        case FOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: true} : u)};
        case UNFOLLOW:
            return {...state, users: state.users.map(u => u.id === action.userID ? {...u, followed: false} : u)};
        case SET_USERS:
            return {...state, users: [...action.users]};
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