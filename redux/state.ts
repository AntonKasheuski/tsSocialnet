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
    dispatch: (action: NewPostTextUpdatingPropsType | AddPostPropsType | NewPostMessageUpdatingPropsType | AddMessagePropsType) => void
}
export type NewPostTextUpdatingPropsType = {
    type: "NEW-POST-TEXT-UPDATING"
    newPostText: string
}
export type AddPostPropsType = {
    type: "ADD-POST"
}
export type NewPostMessageUpdatingPropsType = {
    type: "NEW-MESSAGE-TEXT-UPDATING"
    newMessageText: string
}
export type AddMessagePropsType = {
    type: "ADD-MESSAGE"
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

    dispatch(action) {
        if (action.type === "NEW-POST-TEXT-UPDATING") {
            this._state.profilePage.newPostText = action.newPostText
            this._onChange();
        } else if (action.type === "ADD-POST") {
            const newPost: PostType = {
                id: 4,
                post: this._state.profilePage.newPostText,
                likesCount: 0
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ""
            this._onChange();
        } else if (action.type === "NEW-MESSAGE-TEXT-UPDATING") {
            this._state.messagesPage.newMessageText = action.newMessageText
            this._onChange()
        } else if (action.type === "ADD-MESSAGE") {
            const newMessage = {
                id: 6,
                message: this._state.messagesPage.newMessageText
            }
            this._state.messagesPage.messages.push(newMessage)
            this._state.messagesPage.newMessageText = ""
            this._onChange()
        }
    }
}