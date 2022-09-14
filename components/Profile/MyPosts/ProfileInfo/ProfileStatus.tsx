import React, {ChangeEvent, useEffect, useState} from "react";
import {useAppSelector} from "../../../../hooks/hooks";
import {updateStatus} from "../../../../redux/profileSlice";

export const ProfileStatus = () => {
    const status = useAppSelector(state => state.profilePage.status)

    const [editMode, setEditMode] = useState(false)
    const [newStatus, setNewStatus] = useState(status)

    useEffect(() => {
        setNewStatus(status)
    }, [status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        updateStatus(newStatus);
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewStatus(e.currentTarget.value)
    }

    return (
        <div>
            {editMode
                ? <div>
                    <input
                        value={status}
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