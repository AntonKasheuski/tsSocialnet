import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxToolkitHooks";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chatSlice";

export const ChatPage = () => {
    const status = useAppSelector(state => state.chatPage.status)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [dispatch])

    return (
        <div>
            {status === 'error' && <div>Some error occurred. Please refresh the page</div>}
            <ChatMessages/>
            <NewChatMessageForm/>
        </div>
    );
};

export const ChatMessages = () => {
    const messages = useAppSelector(state => state.chatPage.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight ) < 200) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView(true)
        }
    }, [messages])

    return (
        <div style={{height: '300px', overflowY: 'auto', margin: '10px 20px'}} onScroll={scrollHandler}>
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
            <div ref={messagesAnchorRef}></div>
        </div>
    );
};

export const NewChatMessageForm = () => {
    const [newMessageText, setNewMessageText] = useState('')

    const status = useAppSelector(state => state.chatPage.status)
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
                <button disabled={status !== 'connected'} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    );
};