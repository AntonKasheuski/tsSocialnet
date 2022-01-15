export type DialogType = {
    id: number,
    name: string
}
export type MessageType = {
    id: number,
    message: string
}
export type PostType = {
    id: number,
    post: string,
    likesCount: number
}
export type SidebarType = {
    friends: Array<DialogType>
}
export type MessagesPageType = {
    dialogs: Array<DialogType>,
    newMessageText: string,
    messages: Array<MessageType>
}
export type ProfilePageType = {
    newPostText: string,
    posts: Array<PostType>
}
export type RootStateType = {
    sidebar: SidebarType,
    messagesPage: MessagesPageType,
    profilePage: ProfilePageType
}
export type StoreType = {
    _state: RootStateType
    _onChange: () => void
    getState: () => RootStateType
    subscribe: (observer: () => void) => void
    newPostTextUpdating: (newPostText: string) => void
    addPost: () => void
    newMessageTextUpdating: (newMessageText: string) => void
    addMessage: () => void
}

export const store: StoreType = {
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
    _onChange() {
        console.log('state changed')
    },

    getState() {
        return this._state
    },
    subscribe(callback) {
        this._onChange = callback
    },

    newPostTextUpdating(newPostText: string) {
        this._state.profilePage.newPostText = newPostText
        this._onChange();
    },
    addPost() {
        const newPost: PostType = {
            id: 4,
            post: this._state.profilePage.newPostText,
            likesCount: 0
        }
        this._state.profilePage.posts.push(newPost)
        this._state.profilePage.newPostText = ""
        this._onChange();
    },
    newMessageTextUpdating(newMessageText: string) {
        this._state.messagesPage.newMessageText = newMessageText
        this._onChange()
    },
    addMessage() {
        const newMessage = {
            id: 6,
            message: this._state.messagesPage.newMessageText
        }
        this._state.messagesPage.messages.push(newMessage)
        this._state.messagesPage.newMessageText = ""
        this._onChange()
    },
}