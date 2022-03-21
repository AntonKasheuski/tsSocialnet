import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getStatus, ProfileType, setCurrentUser, updateStatus} from "../../redux/profile-reducer";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {withUrlDataContainerComponent} from "../../hoc/withUrlDataContainerComponent";

class ProfileContainer extends React.Component<WithUrlDataContainerComponentPropsType> {
    componentDidMount() {
        let userId = this.props.match ? this.props.match.params.userId : this.props.userId;
        this.props.setCurrentUser(userId)
        this.props.getStatus(userId)
    }

    render() {
        return (
            <div>
                <Profile {...this.props}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                />
            </div>
        )
    }
}

type MapStateToPropsType = {
    profile: ProfileType
    status: string
    userId: number
}
type MapDispatchPropsType = {
    setCurrentUser: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
}

export type ProfilePagePropsType = MapStateToPropsType & MapDispatchPropsType

type MatchPropsType = {
    match: any
}
export type WithUrlDataContainerComponentPropsType = ProfilePagePropsType & MatchPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.userId
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {setCurrentUser, getStatus, updateStatus}),
    withAuthRedirect,
    withUrlDataContainerComponent
)(ProfileContainer)