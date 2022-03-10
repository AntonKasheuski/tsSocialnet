import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType, setCurrentUser} from "../../redux/profile-reducer";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {withUrlDataContainerComponent} from "../../hoc/withUrlDataContainerComponent";

class ProfileContainer extends React.Component<WithUrlDataContainerComponentPropsType> {
    componentDidMount() {
        let userId = this.props.match ? this.props.match.params.userId : '22187';
        this.props.setCurrentUser(userId)
    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
    }
}

type MapStateToPropsType = {
    profile: ProfileType
}
type MapDispatchPropsType = {
    setCurrentUser: (userId: number) => void
}

export type ProfilePagePropsType = MapStateToPropsType & MapDispatchPropsType

type MatchPropsType = {
    match: any
}
export type WithUrlDataContainerComponentPropsType = ProfilePagePropsType & MatchPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {setCurrentUser}),
    withAuthRedirect,
    withUrlDataContainerComponent
)(ProfileContainer)