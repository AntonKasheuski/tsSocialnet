import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {usersAPI} from "../api/api";
import {RootState} from "./rtk-store";

type GetSelectedPageUsersInputType = {
    pageNumber: number,
    pageSize: number,
}
type GetPageUsersReturnType = {
    items: UserType[],
    totalCount: number,
    error: string,
}
type ThunkReturnType<T = {}> = {
    data: T,
    resultCode: number,
    messages: string[],
}

export const getPageUsers = createAsyncThunk(
    'users/getSelectedPageUsers',
    async ({pageNumber, pageSize}: GetSelectedPageUsersInputType) => {
        return await usersAPI.getUsers(pageNumber, pageSize) as GetPageUsersReturnType
    }
)
export const toggleFollowUser = createAsyncThunk(
    'users/followUser',
    async (userId: number, thunkAPI) => {
        let state = thunkAPI.getState() as RootState
        let user = state.usersPage.users.find(u => u.id === userId)
        if (user && user.followed) {
            return await usersAPI.unfollowUser(userId) as ThunkReturnType
        } else {
            return await usersAPI.followUser(userId) as ThunkReturnType
        }

    }
)


type UserPhotosType = {
    small: string
    large: string
}
export type UserType = {
    id: number
    name: string
    photos: UserPhotosType
    status: string
    followed: boolean
}
export type UsersPageType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    followingInProgressArray: number[]
}

const initialState: UsersPageType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgressArray: [],
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPageUsers.pending, (state) => {
                state.isFetching = true
            })
            .addCase(getPageUsers.fulfilled, (state, action) => {
                state.isFetching = false
                state.users = action.payload.items
                state.totalUsersCount = action.payload.totalCount
                state.currentPage = action.meta.arg.pageNumber
            })
            .addCase(toggleFollowUser.pending, (state, {meta}) => {
                state.followingInProgressArray.push(meta.arg)
            })
            .addCase(toggleFollowUser.fulfilled, (state, action) => {
                state.followingInProgressArray = state.followingInProgressArray.filter(id => id !== action.meta.arg)
                if (action.payload.resultCode === 0) {
                    state.users.map(u => u.id === action.meta.arg ? u.followed = !u.followed : u)
                } else {
                    alert(action.payload.messages[0])
                }
            })
    }
})

export default usersSlice.reducer