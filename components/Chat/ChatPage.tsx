import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxToolkitHooks";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chatSlice";

export const ChatPage = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [])

    return (
        <div>
            <ChatMessages />
            <NewChatMessageForm />
        </div>
    );
};

export const ChatMessages = () => {
    const messages = useAppSelector(state => state.chatPage.messages)

    return (
        <div style={{height: '300px', overflowY: 'auto', margin: '10px 20px'}}>
            chat
            {messages.map((m, i) => {
                return (
                    <div key={i}>
                        <img src={m.photo} style={{width: '30px'}}/>
                        <b>{m.userName}</b>
                        <br/>
                        <div>{m.message}</div>
                        <hr/>
                    </div>
                )
            })}
        </div>
    );
};

export const NewChatMessageForm = () => {
    const [newMessageText, setNewMessageText] = useState('')
    const [chanelStatus, setChanelStatus] = useState<'pending' | 'connected'>('pending')
    const dispatch = useAppDispatch()

    const sendMessageHandler = () => {
        newMessageText && dispatch(sendMessage(newMessageText))
        setNewMessageText('')
    }

    return (
        <div style={{margin: '20px'}}>
            <div>
                <textarea value={newMessageText} onChange={e => setNewMessageText(e.currentTarget.value)}/>
            </div>
            <div>
                <button disabled={false} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    );
};