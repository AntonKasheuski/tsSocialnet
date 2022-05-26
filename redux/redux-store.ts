import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {sidebarReducer} from "./sidebar-reducer";
import {dialogsReducer, DialogsReducerActionType} from "./dialogs-reducer";
import {profileReducer, ProfileReducerActionType} from "./profile-reducer";
import {usersReducer, UsersReducerActionType} from "./users-reducer";
import {authReducer, AuthReducerActionType} from "./auth-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {appReducer, AppReducerActionType} from "./app-reducer";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer
})

export type AppStateType = ReturnType<typeof rootReducer>

export type AppActionsType = AppReducerActionType
    | AuthReducerActionType
    | DialogsReducerActionType
    | ProfileReducerActionType
    | UsersReducerActionType

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppStateType,
    unknown,
    AppActionsType
    >

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

// @ts-ignore
window.__store__ = store;