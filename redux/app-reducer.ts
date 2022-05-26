import {AppThunk} from "./redux-store";
import {authorizationCheck} from "./auth-reducer";

enum AppActionType {
    INITIALIZATION_SUCCESS = "App/INITIALIZATION-SUCCESS",
}

export type AppType = {
    initializationSuccess: boolean
}
const initialState = {
    initializationSuccess: false,
}

export type AppReducerActionType = InitializationSuccessActionType
export const appReducer = (state: AppType = initialState, action: AppReducerActionType): AppType => {
    switch (action.type) {
        case AppActionType.INITIALIZATION_SUCCESS:
            return {...state, initializationSuccess: true};
        default:
            return state;
    }
}

type InitializationSuccessActionType = ReturnType<typeof initializationSuccess>
export const initializationSuccess = () => {
    return {type: AppActionType.INITIALIZATION_SUCCESS} as const
}

export const initialization = (): AppThunk => (dispatch) => {
    let promise = dispatch(authorizationCheck())
    Promise.all([promise])
        .then(() => {
            dispatch(initializationSuccess())
        })
}