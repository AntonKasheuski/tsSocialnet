import {profileAPI} from "../api/api";
import {AppThunk} from "./redux-store";

enum ProfileActionType {
    ADD_POST = "Profile/ADD-POST",
    SET_USER_PROFILE = "Profile/SET-USER-PROFILE",
    SET_STATUS = "Profile/SET-STATUS",
}

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

const initialState = {
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

export type ProfileReducerActionType = AddPostActionType | SetStatusActionType | SetUserProfileActionType
export const profileReducer = (state: ProfilePageType = initialState, action: ProfileReducerActionType): ProfilePageType => {
    switch (action.type) {
        case ProfileActionType.ADD_POST:
            const newPost: PostType = {
                id: 4,
                post: action.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            }
        case ProfileActionType.SET_STATUS:
            return {...state, status: action.status}
        case ProfileActionType.SET_USER_PROFILE:
            return {...state, profile: action.profile}
        default:
            return state;
    }
}

export type AddPostActionType = ReturnType<typeof addPost>
export const addPost = (newPostText: string) => {
    return {type: ProfileActionType.ADD_POST, newPostText} as const
}
export type SetStatusActionType = ReturnType<typeof setStatus>
export const setStatus = (status: string) => {
    return {type: ProfileActionType.SET_STATUS, status} as const
}
export type SetUserProfileActionType = ReturnType<typeof setUserProfile>
export const setUserProfile = (profile: ProfileType) => {
    return {type: ProfileActionType.SET_USER_PROFILE, profile} as const
}

export const setCurrentUser = (userId: number): AppThunk => async (dispatch) => {
    let response = await profileAPI.getCurrentUser(userId)
    dispatch(setUserProfile(response))
}

export const getStatus = (userId: number): AppThunk => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
    dispatch(setStatus(response))
}

export const updateStatus = (status: string): AppThunk => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status))
    }
}