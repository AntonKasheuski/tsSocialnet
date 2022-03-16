import React, {ChangeEvent} from "react";
import {ProfilePropsType} from "../../Profile";

class ProfileStatus extends React.Component<ProfilePropsType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    render() {
        return (
            <div>
                {this.state.editMode
                    ? <div>
                        <input
                            value={this.state.status}
                            onBlur={this.deactivateEditMode}
                            autoFocus={true}
                            onChange={this.onStatusChange}
                        />
                    </div>
                    : <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || "-------"}</span>
                    </div>
                }
            </div>

        )
    }
}

export default ProfileStatus
