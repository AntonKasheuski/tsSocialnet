import {profileAPI} from "../api/api";
import {AppThunk} from "./redux-store";

const NEW_POST_TEXT_UPDATING = "NEW-POST-TEXT-UPDATING";
const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_STATUS = "SET-STATUS";

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
    newPostText: string
    posts: Array<PostType>
    profile: ProfileType
    status: string
}

export type NewPostTextUpdatingType = ReturnType<typeof newPostTextUpdating>
export type AddPostPropsType = ReturnType<typeof addPost>
export type SetStatusPropsType = ReturnType<typeof setStatus>
export type SetUserProfileType = ReturnType<typeof setUserProfile>
export type ProfileActionType = NewPostTextUpdatingType | AddPostPropsType | SetStatusPropsType | SetUserProfileType

const initialState = {
    newPostText: "",
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
            large:  "",
        },
    },
    status: "",
}

export const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionType): ProfilePageType => {
    switch (action.type) {
        case NEW_POST_TEXT_UPDATING:
            return {...state, newPostText: action.newPostText}
        case ADD_POST:
            const newPost: PostType = {
                id: 4,
                post: state.newPostText,
                likesCount: 0
            }
            return {...state,
                posts: [...state.posts, newPost],
                newPostText: ""
            }
        case SET_STATUS:
            return {...state, status: action.status}
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}
        default:
            return state;
    }
}

export const newPostTextUpdating = (newPostText: string) => {
    return {type: NEW_POST_TEXT_UPDATING, newPostText: newPostText} as const
}
export const addPost = () => {
    return {type: ADD_POST} as const
}
export const setStatus = (status: string) => {
    return {type: SET_STATUS, status} as const
}
export const setUserProfile = (profile: ProfileType) => {
    return {type: SET_USER_PROFILE, profile} as const
}

export const setCurrentUser = (userId: number): AppThunk => (dispatch) => {
    profileAPI.getCurrentUser(userId)
        .then(response => {
            dispatch(setUserProfile(response))
        });
}

export const getStatus = (userId: number): AppThunk => (dispatch) => {
    profileAPI.getStatus(userId)
        .then(response => {
            dispatch(setStatus(response.data))
        });
}

export const updateStatus = (status: string): AppThunk => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status))
            }
        });
}