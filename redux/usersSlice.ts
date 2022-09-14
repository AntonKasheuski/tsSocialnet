import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {usersAPI} from "../api/api";


type GetStartPageUsersInputType = {
    currentPage: number,
    pageSize: number,
}
type GetPageUsersReturnType = {
    items: UserType[],
    totalCount: number,
    error: string,
}
export const getStartPageUsers = createAsyncThunk(
    'users/getStartPageUsers',
    async ({currentPage, pageSize}: GetStartPageUsersInputType) => {
        return await usersAPI.getUsers(currentPage, pageSize) as GetPageUsersReturnType
    }
)

type GetSelectedPageUsersInputType = {
    pageNumber: number,
    pageSize: number,
}
export const getSelectedPageUsers = createAsyncThunk(
    'users/getSelectedPageUsers',
    async ({pageNumber, pageSize}: GetSelectedPageUsersInputType) => {
        return await usersAPI.getUsers(pageNumber, pageSize) as GetPageUsersReturnType
    }
)

type FollowUserReturnType = {
    resultCode: number,
    messages: string[],
    data: {},
}
export const followUser = createAsyncThunk(
    'profile/followUser',
    async (userId: number) => {
        return await usersAPI.followUser(userId) as FollowUserReturnType
    }
)

export const unfollowUser = createAsyncThunk(
    'profile/unfollowUser',
    async (userId: number) => {
        return await usersAPI.unfollowUser(userId) as FollowUserReturnType
    }
)

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
    reducers: {
        followUserAccept: (state, action: PayloadAction<number>) => {
            state.users.map(u => u.id === action.payload ? u.followed = true : u)
        },
        unfollowUserAccept: (state, action: PayloadAction<number>) => {
            state.users.map(u => u.id === action.payload ? u.followed = false : u)
        },
        setUsers: (state, action: PayloadAction<UserType[]>) => {
            state.users = action.payload
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        setTotalUsersCount: (state, action: PayloadAction<number>) => {
            state.totalUsersCount = action.payload
        },
        toggleFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload
        },
        toggleFollowingProgress: (state, action: PayloadAction<{ followingProgress: boolean, userId: number }>) => {
            action.payload.followingProgress
                ? state.followingInProgressArray.push(action.payload.userId)
                : state.followingInProgressArray.filter(id => id !== action.payload.userId)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getStartPageUsers.pending, (state) => {
                state.isFetching = true
            })
            .addCase(getStartPageUsers.fulfilled, (state, action) => {
                state.isFetching = false
                state.users = action.payload.items
                state.totalUsersCount = action.payload.totalCount
            })
            .addCase(getSelectedPageUsers.pending, (state) => {
                state.isFetching = true
            })
            .addCase(getSelectedPageUsers.fulfilled, (state, action) => {
                state.isFetching = false
                state.users = action.payload.items
            })
            .addCase(followUser.pending, (state, {meta}) => {
                state.followingInProgressArray.push(meta.arg)
            })
            .addCase(followUser.fulfilled, (state, action) => {
                state.followingInProgressArray.filter(id => id !== action.meta.arg)
                if (action.payload.resultCode === 0) {
                    state.users.map(u => u.id === action.meta.arg ? u.followed = true : u)
                } else {
                    alert(action.payload.messages[0])
                }
            })
            .addCase(unfollowUser.pending, (state, {meta}) => {
                state.followingInProgressArray.push(meta.arg)
            })
            .addCase(unfollowUser.fulfilled, (state, action) => {
                state.followingInProgressArray.filter(id => id !== action.meta.arg)
                if (action.payload.resultCode === 0) {
                    state.users.map(u => u.id === action.meta.arg ? u.followed = false : u)
                } else {
                    alert(action.payload.messages[0])
                }
            })
    }
})

export const {
    followUserAccept,
    unfollowUserAccept,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleFetching,
    toggleFollowingProgress
} = usersSlice.actions

export default usersSlice.reducer