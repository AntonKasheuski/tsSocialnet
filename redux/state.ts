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
export type SidebarType = {}
export type MessagesPageType = {
    dialogs: Array<DialogType>,
    messages: Array<MessageType>
}
export type ProfilePageType = {
    posts: Array<PostType>
}
export type RootStateType = {
    sidebar: SidebarType,
    messagesPage: MessagesPageType,
    profilePage: ProfilePageType
}

let state = {
    sidebar: {},
    messagesPage: {
        dialogs: [
            {id: 1, name: 'Daria'},
            {id: 2, name: 'Vasya'},
            {id: 3, name: 'Petya'},
            {id: 4, name: 'Sasha'},
            {id: 5, name: 'Viktor'},
            {id: 6, name: 'Antonio'}
        ],
        messages: [
            {id: 1, message: 'Hi!'},
            {id: 2, message: 'Hey!'},
            {id: 3, message: 'Yo!'},
            {id: 4, message: 'Yo!'},
            {id: 5, message: 'Yo!'}
        ]
    },
    profilePage: {
        posts: [
            {id: 1, post: "Hi, how are you?", likesCount: 15},
            {id: 2, post: "It's my first post", likesCount: 20}
        ]},

}

export default state;