import {authAPI} from "../api/api";
import {AppThunk} from "./redux-store";

enum AuthActionType {
    SET_USER_DATA = "Auth/SET-USER-DATA",
    TOGGLE_FETCHING = "Auth/TOGGLE-FETCHING",
    SET_ERROR_MESSAGE = "Auth/SET-ERROR-MESSAGE",
}

export type AuthType = {
    userId: number
    email: string
    login: string
    isFetching: boolean
    isAuth: boolean
    errorMessage: string | null
}
const initialState = {
    userId: NaN,
    email: "",
    login: "",
    isFetching: false,
    isAuth: false,
    errorMessage: null
}

export type AuthReducerActionType = SetUserDataActionType | ToggleFetchingActionType | SetErrorMessageActionType
export const authReducer = (state: AuthType = initialState, action: AuthReducerActionType): AuthType => {
    switch (action.type) {
        case AuthActionType.SET_USER_DATA:
            return {...state, ...action.payload};
        case AuthActionType.TOGGLE_FETCHING:
            return {...state, isFetching: action.isFetching};
        case AuthActionType.SET_ERROR_MESSAGE:
            return {...state, errorMessage: action.errorMessage}
        default:
            return state;
    }
}

type SetUserDataActionType = ReturnType<typeof setAuthUserData>
export const setAuthUserData = (userId: number, email: string, login: string, isAuth: boolean) => {
    return {type: AuthActionType.SET_USER_DATA, payload: {userId, email, login, isAuth}} as const
}
type ToggleFetchingActionType = ReturnType<typeof toggleFetching>
export const toggleFetching = (isFetching: boolean) => {
    return {type: AuthActionType.TOGGLE_FETCHING, isFetching} as const
}
type SetErrorMessageActionType = ReturnType<typeof setErrorMessage>
export const setErrorMessage = (errorMessage: string | null) => {
    return {type: AuthActionType.SET_ERROR_MESSAGE, errorMessage} as const
}

export const authorizationCheck = (): AppThunk => async (dispatch) => {
    dispatch(toggleFetching(true))
    let response = await authAPI.authorizationCheck()
    dispatch(toggleFetching(false))
    if (response.resultCode === 0) {
        dispatch(setAuthUserData(
            response.data.id,
            response.data.email,
            response.data.login,
            true
        ))
    }
}
export const logIn = (email: string, password: string, rememberMe: boolean): AppThunk => async (dispatch) => {
    dispatch(toggleFetching(true))
    let response = await authAPI.logIn(email, password, rememberMe)
    dispatch(toggleFetching(false))
    if (response.resultCode === 0) {
        dispatch(authorizationCheck())
    }
    if (response.resultCode === 1) {
        dispatch(setErrorMessage(response.messages[0]))
    }
}
export const logOut = (): AppThunk => async (dispatch) => {
    dispatch(toggleFetching(true))
    let response = await authAPI.logOut()
    dispatch(toggleFetching(false))
    if (response.resultCode === 0) {
        dispatch(setAuthUserData(NaN, "", "", false))
    }
}