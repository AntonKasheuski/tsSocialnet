import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {profileAPI} from "../api/api";

type ThunkReturnType<T = {}> = {
    data: T,
    resultCode: number,
    messages: string[],
}

export const setCurrentUser = createAsyncThunk(
    'profile/setCurrentUser',
    async (userId: number) => {
        return await profileAPI.getCurrentUser(userId) as ProfileType
    }
)
export const getStatus = createAsyncThunk(
    'profile/getStatus',
    async (userId: number) => {
        return await profileAPI.getStatus(userId)
    }
)
export const updateStatus = createAsyncThunk(
    'profile/updateStatus',
    async (status: string) => {
        return await profileAPI.updateStatus(status) as ThunkReturnType
    }
)

export type PostType = {
    id: number
    post: string
    date: string
    commentsCount: number
    likesCount: number
    shareCount: number
    savedCount: number
}
type ContactsType = {
    facebook: string
    website: string
    vk: string
    twitter: string
    instagram: string
    youtube: string
    github: string
    mainLink: string
}
type ProfilePhotosType = {
    small: string
    large: string
}
export type ProfileType = {
    aboutMe: string
    contacts: ContactsType
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    userId: number
    photos: ProfilePhotosType
}
export type ProfilePageType = {
    posts: Array<PostType>
    profile: ProfileType
    status: string
}

const initialState: ProfilePageType = {
    posts: [
        {
            id: 1,
            post: "Hi, how are you?",
            date: "16/07/2022, 11:37",
            commentsCount: 15,
            likesCount: 15,
            shareCount: 2,
            savedCount: 5
        },
        {
            id: 2,
            post: "It's my first post",
            date: "18/07/2022, 08:20",
            commentsCount: 12,
            likesCount: 20,
            shareCount: 1,
            savedCount: 0
        },
        {
            id: 3,
            post: "Bla-bla",
            date: "28/08/2022, 19:51",
            commentsCount: 3,
            likesCount: 30,
            shareCount: 5,
            savedCount: 8
        }
    ],
    profile: {
        aboutMe: "",
        contacts: {
            facebook: "",
            website: "",
            vk: "",
            twitter: "",
            instagram: "",
            youtube: "",
            github: "",
            mainLink: "",
        },
        lookingForAJob: true,
        lookingForAJobDescription: "",
        fullName: "",
        userId: NaN,
        photos: {
            small: "",
            large: "",
        },
    },
    status: "",
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<{ inputValue: string, date: string }>) => {
            const newPost: PostType = {
                id: state.posts.length + 1,
                post: action.payload.inputValue,
                date: action.payload.date,
                commentsCount: 0,
                likesCount: 0,
                shareCount: 0,
                savedCount: 0,
            }
            state.posts.push(newPost)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(setCurrentUser.fulfilled, (state, action) => {
                state.profile = action.payload
            })
            .addCase(getStatus.fulfilled, (state, action) => {
                state.status = action.payload
            })
            .addCase(updateStatus.fulfilled, (state, action) => {
                if (action.payload.resultCode === 0) {
                    state.status = action.meta.arg
                }
            })
    }
})

export const {addPost} = profileSlice.actions

export default profileSlice.reducer