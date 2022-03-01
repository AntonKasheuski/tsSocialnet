import {authAPI} from "../api/api";
import {AppThunk} from "./redux-store";

const SET_USER_DATA = "SET-USER-DATA"
const TOGGLE_FETCHING = "TOGGLE-FETCHING"

export type AuthType = {
    userId: number
    email: string
    login: string
    isFetching: boolean
    isAuth: boolean
}

type SetUserDataActionType = ReturnType<typeof setAuthUserData>
type ToggleFetchingType = ReturnType<typeof toggleFetching>
export type UsersActionType = SetUserDataActionType | ToggleFetchingType

const initialState = {
    userId: NaN,
    email: "",
    login: "",
    isFetching: false,
    isAuth: false,
}

export const authReducer = (state: AuthType = initialState, action: UsersActionType): AuthType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {...state, ...action.data, isAuth: true};
        case TOGGLE_FETCHING:
            return {...state, isFetching: action.isFetching};
        default:
            return state;
    }
}

export const setAuthUserData = (userId: number, email: string, login: string) => {
    return {type: SET_USER_DATA, data: {userId, email, login}} as const
}
export const toggleFetching = (isFetching: boolean) => {
    return {type: TOGGLE_FETCHING, isFetching} as const
}

export const authorizationCheck = (): AppThunk => (dispatch) => {
    dispatch(toggleFetching(true))
    authAPI.authorizationCheck()
        .then(response => {
            dispatch(toggleFetching(false))
            if (response.resultCode === 0) {
                dispatch(setAuthUserData(
                    response.data.id,
                    response.data.email,
                    response.data.login
                ))
            }
        });
}