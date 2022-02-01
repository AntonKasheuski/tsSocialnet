import {combineReducers, createStore} from "redux";
import {sidebarReducer} from "./sidebar-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {profileReducer} from "./profile-reducer";

const rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogsReducer,
    sidebar: sidebarReducer,
})

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);