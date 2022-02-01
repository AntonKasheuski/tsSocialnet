import React from 'react';
import {
    addMessageActionCreator, MessageType,
    newMessageTextUpdatingActionCreator,
} from "../../../redux/dialogs-reducer";
import {Message} from "./Message";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

type MapStatePropsType = {
    messages: Array<MessageType>
    newMessageText: string
}
type MapDispatchPropsType = {
    newMessageTextUpdating: (newMessageText: string) => void
    addMessage: () => void
}
export type MessagePropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        messages: state.messagesPage.messages,
        newMessageText: state.messagesPage.newMessageText
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        newMessageTextUpdating: (text: string) => {
            dispatch(newMessageTextUpdatingActionCreator(text))
        },
        addMessage: () => {
            dispatch(addMessageActionCreator())
        }
    }
}

export const MessageContainer = connect(mapStateToProps, mapDispatchToProps)(Message)

