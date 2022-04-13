import React, {ChangeEvent, useEffect, useState} from "react";
import {ProfilePropsType} from "../../Profile";

export const ProfileStatusWithHooks = (props: ProfilePropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status);
    }
    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
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
                    <span onDoubleClick={activateEditMode}>{props.status || "-------"}</span>
                </div>
            }
        </div>
    )
}