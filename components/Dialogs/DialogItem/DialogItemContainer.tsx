import React from 'react';
import {DialogItem} from "./DialogItem";
import StoreContext from "../../../StoreContext"

export function DialogItemContainer() {

    return (
        <StoreContext.Consumer>
            {store =>
                <DialogItem dialogs={store.getState().messagesPage.dialogs} />
            }
        </StoreContext.Consumer>
    )
}
