import {renderTree} from "../render";

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

let state = {
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
}

export const newPostTextUpdating = (newPostText: string) => {
    state.profilePage.newPostText = newPostText
    renderTree();
}

export const addPost = () => {
    const newPost: PostType = {
        id: 4,
        post: state.profilePage.newPostText,
        likesCount: 0
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ""
    renderTree();
}

export const newMessageTextUpdating = (newMessageText: string) => {
    state.messagesPage.newMessageText = newMessageText
    renderTree()
}

export const addMessage = () => {
    const newMessage = {
        id: 6,
        message: state.messagesPage.newMessageText
    }
    state.messagesPage.messages.push(newMessage)
    state.messagesPage.newMessageText = ""
    renderTree()
}

export default state;