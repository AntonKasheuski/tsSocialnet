import React from 'react';
import {DialogItem} from "./DialogItem";
import {connect} from "react-redux";
import {DialogType} from "../../../redux/dialogs-reducer";
import {AppStateType} from "../../../redux/redux-store";

type MapStatePropsType = {
    dialogs: Array<DialogType>
}
type MapDispatchPropsType = {

}
export type DialogItemPropsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        dialogs: state.messagesPage.dialogs
    }
}

export const DialogItemContainer = connect(mapStateToProps) (DialogItem)