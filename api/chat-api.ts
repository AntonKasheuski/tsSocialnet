export type ChatMessageAPIType = {
    message: string,
    photo: string,
    userId: number,
    userName: string,
}
export type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void

export type StatusType = 'pending' | 'connected' | 'error'
export type StatusChangedSubscriberType = (status: StatusType) => void

type EventsNameType = 'messages-received' | 'status-changed'

let subscribers = {
    'messages-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[],
}

let ws: WebSocket | null = null

const closeHandler = () => {
    notifySubscribersAboutStatusChanging('pending')
    setTimeout(createChanel, 3000)
}
const messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
}
const openHandler = () => {
    notifySubscribersAboutStatusChanging('connected')
}
const errorHandler = () => {
    notifySubscribersAboutStatusChanging('error')
}
const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}
const notifySubscribersAboutStatusChanging = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}
function createChanel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
    notifySubscribersAboutStatusChanging('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start() {
        createChanel()
    },
    stop() {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
    },
    subscribe(eventName: EventsNameType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName].push(callback)
        return () => {
            // @ts-ignore
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe(eventName: EventsNameType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
        // @ts-ignore
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(newMessage: string) {
        ws?.send(newMessage)
    },
}