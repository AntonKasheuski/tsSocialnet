import {combineReducers, createStore} from "redux";
import sidebarReducer from "./sidebar-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

const reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
})

/*type ReducersType = typeof reducers;
export type StateType = ReturnType<ReducersType>*/

let store = createStore(reducers);

export default store;