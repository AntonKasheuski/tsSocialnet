import React from 'react';
import {
    addMessageActionCreator,
    newMessageTextUpdatingActionCreator,
} from "../../../redux/dialogs-reducer";
import {Message} from "./Message";
import StoreContext from "../../../StoreContext"

export function MessageContainer() {

    return (
        <StoreContext.Consumer>
            {store => {
                const newMessageTextUpdating = (text: string) => {
                    store.dispatch(newMessageTextUpdatingActionCreator(text))
                }

                const addMessage = () => {
                    store.dispatch(addMessageActionCreator())
                }

                return <Message
                    messages={store.getState().dialogsPage.messages}
                    newMessageText={store.getState().dialogsPage.newMessageText}
                    newMessageTextUpdating={newMessageTextUpdating}
                    addMessage={addMessage}
                />
            }}
        </StoreContext.Consumer>
    )
}

