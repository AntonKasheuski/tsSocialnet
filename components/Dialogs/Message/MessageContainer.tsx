import React from 'react';
import {MessageType} from "../../../redux/dialogs-reducer";
import {Message} from "./Message";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";

type MapStatePropsType = {
    messages: Array<MessageType>
    newMessageText: string
}
export type MessagePropsType = MapStatePropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        messages: state.messagesPage.messages,
        newMessageText: state.messagesPage.newMessageText
    }
}

export const MessageContainer = connect(mapStateToProps, {})(Message)

