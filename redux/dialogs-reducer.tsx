import {ActionType, MessagesPageType} from "./state";

const NEW_MESSAGE_TEXT_UPDATING = "NEW-MESSAGE-TEXT-UPDATING";
const ADD_MESSAGE = "ADD-MESSAGE";

export type NewMessageTextUpdatingPropsType = ReturnType<typeof newMessageTextUpdatingActionCreator>
export type AddMessagePropsType = ReturnType<typeof addMessageActionCreator>

const dialogsReducer = (state: MessagesPageType, action: ActionType) => {
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

export default dialogsReducer;