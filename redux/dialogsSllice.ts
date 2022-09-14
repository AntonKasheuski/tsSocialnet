import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type DialogType = {
    id: number,
    name: string
}
export type MessageType = {
    id: number,
    message: string
}
export type MessagesPageType = {
    dialogs: DialogType[],
    newMessageText: string,
    messages: MessageType[]
}

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

export const dialogsSlice = createSlice({
    name: 'dialogs',
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<string>) => {
            const newMessage: MessageType = {
                id: state.messages.length + 1,
                message: action.payload
            }
            state.messages.push(newMessage)
        },
    }
})

export const {addMessage} = dialogsSlice.actions

export default dialogsSlice.reducer