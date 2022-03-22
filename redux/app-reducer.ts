import {AppThunk} from "./redux-store";
import {authorizationCheck} from "./auth-reducer";

const INITIALIZATION_SUCCESS = "INITIALIZATION-SUCCESS"

export type AppType = {
    initializationSuccess: boolean
}

type InitializationSuccessActionType = ReturnType<typeof initializationSuccess>
export type AppReducerActionType = InitializationSuccessActionType

const initialState = {
    initializationSuccess: false,
}

export const appReducer = (state: AppType = initialState, action: AppReducerActionType): AppType => {
    switch (action.type) {
        case INITIALIZATION_SUCCESS:
            return {...state, initializationSuccess: true};
        default:
            return state;
    }
}

export const initializationSuccess = () => {
    return {type: INITIALIZATION_SUCCESS} as const
}

export const initialization = (): AppThunk => (dispatch) => {
    let promise = dispatch(authorizationCheck())
    Promise.all([promise])
        .then(() => {
            dispatch(initializationSuccess())
        })
}