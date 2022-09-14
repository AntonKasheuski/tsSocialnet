import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {profileAPI} from "../api/api";


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

type updateStatusReturnType = {
    data: {},
    resultCode: number,
    messages: string[],
}
export const updateStatus = createAsyncThunk(
    'profile/updateStatus',
    async (status: string) => {
        return await profileAPI.updateStatus(status) as updateStatusReturnType
    }
)


export type PostType = {
    id: number
    post: string
    likesCount: number
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
        {id: 1, post: "Hi, how are you?", likesCount: 15},
        {id: 2, post: "It's my first post", likesCount: 20},
        {id: 3, post: "Bla-bla", likesCount: 30}
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
        addPost: (state, action: PayloadAction<string>) => {
            const newPost: PostType = {
                id: state.posts.length + 1,
                post: action.payload,
                likesCount: 0
            }
            state.posts.push(newPost)
        },
        setStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload
        },
        setUserProfile: (state, action: PayloadAction<ProfileType>) => {
            state.profile = action.payload
        },
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

export const {addPost, setStatus, setUserProfile} = profileSlice.actions

export default profileSlice.reducer