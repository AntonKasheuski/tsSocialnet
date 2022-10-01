import React, {useEffect, useState} from 'react';

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string,
}

export const ChatPage = () => {
    const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

    useEffect(() => {
        let ws: WebSocket

        function createChanel() {
            if (ws) {
                ws.close()
            }
            ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
            ws.onclose = () => {
                setTimeout(() => {
                    createChanel()
                }, 3000)
            }
            setWsChannel(ws)
        }

        createChanel()

        return () => {
            ws.close()
        }
    }, [])

    return (
        <div>
            <ChatMessages wsChannel={wsChannel}/>
            <NewChatMessageForm wsChannel={wsChannel}/>
        </div>
    );
};

export const ChatMessages = ({wsChannel}: { wsChannel: WebSocket | null }) => {
    const [messages, setMessages] = useState<ChatMessageType[]>([])

    useEffect(() => {
        if (wsChannel) wsChannel.onmessage = e => {
            let newMessages = JSON.parse(e.data)
            setMessages((prevMessages) => [...prevMessages, ...newMessages])
        }
        // if (wsChannel) wsChannel.onopen = () => {
        //     console.log('wsopen in ChatPage')
        // }

        return (() => {
            wsChannel?.close()
        })
    }, [wsChannel])

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

export const NewChatMessageForm = ({wsChannel}: { wsChannel: WebSocket | null }) => {
    const [newMessageText, setNewMessageText] = useState('')
    const [chanelStatus, setChanelStatus] = useState<'pending' | 'connected'>('pending')

    const sendMessageHandler = () => {
        newMessageText && wsChannel?.send(newMessageText)
        setNewMessageText('')
    }

    useEffect(() => {
        if (wsChannel) wsChannel.onopen = () => {
            setChanelStatus('connected')
        }
        if (wsChannel) wsChannel.onclose = () => {
            setChanelStatus('pending')
        }

        return (() => {
            wsChannel?.close()
        })
    }, [wsChannel])

    return (
        <div style={{margin: '20px'}}>
            <div>
                <textarea value={newMessageText} onChange={e => setNewMessageText(e.currentTarget.value)}/>
            </div>
            <div>
                <button disabled={chanelStatus !== 'connected'} onClick={sendMessageHandler}>Send</button>
            </div>
        </div>
    );
};