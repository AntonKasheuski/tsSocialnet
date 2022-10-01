import React, {useEffect, useState} from 'react';

let ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string,
}

export const ChatPage = () => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        ws.onmessage = e => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        }
        ws.onopen = () => {
            console.log('wsopen in ChatPage')
        }
    }, [])

    return (
        <div>
            <ChatMessages messages={messages}/>
            <NewChatMessageForm/>
        </div>
    );
};

export const ChatMessages = ({messages}: { messages: ChatMessageType[] }) => {

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

    const sendMessageHandler = () => {
        newMessageText && ws.send(newMessageText)
        setNewMessageText('')
    }

    useEffect(() => {
        ws.onopen = () => {
            setChanelStatus('connected')
        }
    }, [])

    return (
        <div style={{margin: '20px'}}>
            <div>
                <textarea value={newMessageText} onChange={e => setNewMessageText(e.currentTarget.value)}/>
            </div>
            <div>
                <button disabled={chanelStatus === 'pending'} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    );
};