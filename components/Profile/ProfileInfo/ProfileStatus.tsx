import React, {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {updateStatus} from "../../../redux/profileSlice";

export const ProfileStatus = ({userId}: {userId: string}) => {
    const status = useAppSelector(state => state.profilePage.status)
    const currentUserId = useAppSelector(state => state.profilePage.currentProfile.userId)
    const dispatch = useAppDispatch()

    const [editMode, setEditMode] = useState(false)
    const [newStatus, setNewStatus] = useState(status)

    useEffect(() => {
        setNewStatus(status)
    }, [status])

    const activateEditMode = () => {
        currentUserId === +userId && setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(updateStatus(newStatus))
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewStatus(e.currentTarget.value)
    }

    return (
        <div>
            {editMode
                ? <div>
                    <input
                        value={newStatus}
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        onChange={onStatusChange}
                    />
                </div>
                : <div>
                    <span onDoubleClick={activateEditMode}>{status || "-------"}</span>
                </div>
            }
        </div>
    )
}