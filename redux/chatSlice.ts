import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {chatAPI, ChatMessageAPIType, StatusType} from "../api/chat-api";
import {AppDispatch} from "./rtk-store";
import {v1} from 'uuid';

type ChatMessageType = ChatMessageAPIType & {id: string}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: AppDispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(messagesReceived({messages}))
        }
    }
    return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: AppDispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(statusChanged({status}))
        }
    }
    return _statusChangedHandler
}

export const startMessagesListening = createAsyncThunk(
    'chat/startMessagesListening',
    async (_, thunkAPI) => {
        chatAPI.start()
        chatAPI.subscribe('messages-received', newMessageHandlerCreator(thunkAPI.dispatch))
        chatAPI.subscribe('status-changed', statusChangedHandlerCreator(thunkAPI.dispatch))
    })
export const stopMessagesListening = createAsyncThunk(
    'chat/stopMessagesListening',
    async (_, thunkAPI) => {
        chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(thunkAPI.dispatch))
        chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(thunkAPI.dispatch))
        //chatAPI.subscribe(newMessageHandlerCreator(thunkAPI.dispatch))()
        chatAPI.stop()
    })
export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (newMessage: string) => {
        chatAPI.sendMessage(newMessage)
    })

export type ChatType = {
    messages: ChatMessageType[],
    status: StatusType
}
const initialState: ChatType = {
    messages: [] as ChatMessageType[],
    status: 'pending'
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        messagesReceived: (state, action: PayloadAction<{ messages: ChatMessageAPIType[] }>) => {
            state.messages = [
                ...state.messages,
                ...action.payload.messages.map(m => ({...m, id: v1()}))
            ]
                .filter((m, i, array) => i >= array.length - 100)
        },
        statusChanged: (state, action: PayloadAction<{ status: StatusType }>) => {
            state.status = action.payload.status
            if (action.payload.status === 'connected') {
                state.messages = []
            }
        }
    }
})

export const {messagesReceived, statusChanged} = chatSlice.actions

export default chatSlice.reducer