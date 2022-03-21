const ADD_MESSAGE = "ADD-MESSAGE";

export type DialogType = {
    id: number,
    name: string
}
export type MessageType = {
    id: number,
    message: string
}
export type MessagesPageType = {
    dialogs: Array<DialogType>,
    newMessageText: string,
    messages: Array<MessageType>
}

export type AddMessagePropsType = ReturnType<typeof addMessage>
export type DialogsActionType = AddMessagePropsType

const initialState: MessagesPageType = {
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
}

export const dialogsReducer = (state: MessagesPageType = initialState, action: DialogsActionType): MessagesPageType => {
    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage = {
                id: 6,
                message: action.newMessageText
            }
            return {...state,
                messages: [...state.messages, newMessage],
                newMessageText: ""
            }
        default:
            return state;
    }
}

export const addMessage = (newMessageText: string) => {
    return {type: ADD_MESSAGE, newMessageText} as const
}