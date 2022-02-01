const NEW_MESSAGE_TEXT_UPDATING = "NEW-MESSAGE-TEXT-UPDATING";
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

export type NewMessageTextUpdatingPropsType = ReturnType<typeof newMessageTextUpdatingActionCreator>
export type AddMessagePropsType = ReturnType<typeof addMessageActionCreator>
export type DialogsActionType = NewMessageTextUpdatingPropsType | AddMessagePropsType

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
        case NEW_MESSAGE_TEXT_UPDATING:
            state.newMessageText = action.newMessageText
            return state;
        case ADD_MESSAGE:
            const newMessage = {
                id: 6,
                message: state.newMessageText
            }
            state.messages.push(newMessage)
            state.newMessageText = ""
            return state;
        default:
            return state;
    }
}

export const newMessageTextUpdatingActionCreator = (newMessageText: string) => {
    return {type: NEW_MESSAGE_TEXT_UPDATING, newMessageText: newMessageText} as const
}
export const addMessageActionCreator = () => {
    return {type: ADD_MESSAGE} as const
}