import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {chatAPI, ChatMessageType} from "../api/chat-api";
import {AppDispatch} from "./rtk-store";

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: AppDispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(messagesReceived({messages}))
        }
    }
    return _newMessageHandler
}

export const startMessagesListening = createAsyncThunk(
    'chat/startMessagesListening',
    async (_, thunkAPI) => {
        chatAPI.start()
        chatAPI.subscribe(newMessageHandlerCreator(thunkAPI.dispatch))
        })
export const stopMessagesListening = createAsyncThunk(
    'chat/stopMessagesListening',
    async (_, thunkAPI) => {
        chatAPI.unsubscribe(newMessageHandlerCreator(thunkAPI.dispatch))
        //chatAPI.subscribe(newMessageHandlerCreator(thunkAPI.dispatch))()
        chatAPI.stop()
    }
)
export const sendMessage = createAsyncThunk(
    'chat/sendMessage',
    async (newMessage: string) => {
        chatAPI.sendMessage(newMessage)
    })

export type ChatType = {
    messages: ChatMessageType[]
}
const initialState: ChatType = {
    messages: [] as ChatMessageType[]
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        messagesReceived: (state, action: PayloadAction<{ messages: ChatMessageType[] }>) => {
            state.messages = action.payload.messages
        }
    },
    extraReducers: (builder) => {
        builder
            // .addCase(authorizationCheck.pending, (state) => {
            //     !state.isFetching && (state.isFetching = true)
            // })
            .addCase(startMessagesListening.fulfilled, (state, action) => {

            })
    }
})

export const {messagesReceived} = chatSlice.actions

export default chatSlice.reducer