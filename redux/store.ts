import {ProfileReducerActionType} from "./profile-reducer";
import {DialogsReducerActionType} from "./dialogs-reducer";

type DialogType = {
    id: number,
    name: string
}
type MessageType = {
    id: number,
    message: string
}
type PostType = {
    id: number,
    post: string,
    likesCount: number
}
type SidebarType = {
    friends: Array<DialogType>
}
type DialogsPageType = {
    dialogs: Array<DialogType>,
    newMessageText: string,
    messages: Array<MessageType>
}
type ProfilePageType = {
    newPostText: string,
    posts: Array<PostType>
}
type RootStateType = {
    sidebar: SidebarType,
    messagesPage: DialogsPageType,
    profilePage: ProfilePageType
}
type ActionType = ProfileReducerActionType | DialogsReducerActionType
type StoreType = {
    _state: RootStateType
    _callSubscriber: () => void
    getState: () => RootStateType
    subscribe: (observer: () => void) => void
    dispatch: (action: ActionType) => void
}

const store: StoreType = {
    _state: {
        sidebar: {
            friends: [
                {id: 1, name: 'Sasha'},
                {id: 2, name: 'Viktor'},
                {id: 3, name: 'Antonio'},
            ]
        },
        messagesPage: {
            dialogs: [
                {id: 1, name: 'Daria'},
                {id: 2, name: 'Vasya'},
                {id: 3, name: 'Petya'},
                {id: 4, name: 'Sasha'},
                {id: 5, name: 'Viktor'},
                {id: 6, name: 'Antonio'},
            ],
            newMessageText: "",
            messages: [
                {id: 1, message: 'Hi!'},
                {id: 2, message: 'Hey!'},
                {id: 3, message: 'Yo!'},
                {id: 4, message: 'Yo!'},
                {id: 5, message: 'Yo!'},
            ]
        },
        profilePage: {
            newPostText: "",
            posts: [
                {id: 1, post: "Hi, how are you?", likesCount: 15},
                {id: 2, post: "It's my first post", likesCount: 20},
                {id: 3, post: "Bla-bla", likesCount: 30}
            ]
        }
    },
    _callSubscriber() {
        console.log('state changed')
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        /*this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)*/

        this._callSubscriber()
    }
}
