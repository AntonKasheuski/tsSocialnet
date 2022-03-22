import {authAPI} from "../api/api";
import {AppThunk} from "./redux-store";

const SET_USER_DATA = "SET-USER-DATA"
const TOGGLE_FETCHING = "TOGGLE-FETCHING"
const SET_ERROR_MESSAGE = "SET-ERROR-MESSAGE"

export type AuthType = {
    userId: number
    email: string
    login: string
    isFetching: boolean
    isAuth: boolean
    errorMessage: string | null
}

type SetUserDataActionType = ReturnType<typeof setAuthUserData>
type ToggleFetchingActionType = ReturnType<typeof toggleFetching>
type SetErrorMessageActionType = ReturnType<typeof setErrorMessage>
export type AuthReducerActionType = SetUserDataActionType | ToggleFetchingActionType | SetErrorMessageActionType

const initialState = {
    userId: NaN,
    email: "",
    login: "",
    isFetching: false,
    isAuth: false,
    errorMessage: null
}

export const authReducer = (state: AuthType = initialState, action: AuthReducerActionType): AuthType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.payload};
        case TOGGLE_FETCHING:
            return {...state, isFetching: action.isFetching};
        case SET_ERROR_MESSAGE:
            return {...state, errorMessage: action.errorMessage}
        default:
            return state;
    }
}

export const setAuthUserData = (userId: number, email: string, login: string, isAuth: boolean) => {
    return {type: SET_USER_DATA, payload: {userId, email, login, isAuth}} as const
}
export const toggleFetching = (isFetching: boolean) => {
    return {type: TOGGLE_FETCHING, isFetching} as const
}
export const setErrorMessage = (errorMessage: string | null) => {
    return {type: SET_ERROR_MESSAGE, errorMessage} as const
}

export const authorizationCheck = (): AppThunk => (dispatch) => {
    dispatch(toggleFetching(true))
    return authAPI.authorizationCheck()
        .then(response => {
            dispatch(toggleFetching(false))
            if (response.resultCode === 0) {
                dispatch(setAuthUserData(
                    response.data.id,
                    response.data.email,
                    response.data.login,
                    true
                ))
            }
        });
}
export const logIn = (email: string, password: string, rememberMe: boolean): AppThunk => (dispatch) => {
    dispatch(toggleFetching(true))
    authAPI.logIn(email, password, rememberMe)
        .then(response => {
            dispatch(toggleFetching(false))
            if (response.resultCode === 0) {
                dispatch(authorizationCheck())
            }
            if (response.resultCode === 1) {
                dispatch(setErrorMessage(response.messages[0]))
            }
        })
}
export const logOut = (): AppThunk => (dispatch) => {
    dispatch(toggleFetching(true))
    authAPI.logOut()
        .then(response => {
            dispatch(toggleFetching(false))
            if (response.resultCode === 0) {
                dispatch(setAuthUserData(NaN, "", "", false))
            }
        })
}