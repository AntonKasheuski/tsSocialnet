import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType, setCurrentUser} from "../../redux/profile-reducer";
import {Navigate, useMatch} from "react-router-dom";

class ProfileContainer extends React.Component<WithUrlDataContainerComponentPropsType> {
    componentDidMount() {
        let userId = this.props.match ? this.props.match.params.userId : '22187';
        this.props.setCurrentUser(userId)
    }

    render() {
        if (!this.props.isAuth) return <Navigate replace to="/login"/>

        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
    }
}

type MapStateToPropsType = {
    profile: ProfileType
    isAuth: boolean
}
type MapDispatchPropsType = {
    setCurrentUser: (userId: number) => void
}

export type ProfilePagePropsType = MapStateToPropsType & MapDispatchPropsType

type MatchPropsType = {
    match: any
}
type WithUrlDataContainerComponentPropsType = ProfilePagePropsType & MatchPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth
})

const WithUrlDataContainerComponent = (props: ProfilePagePropsType): JSX.Element => {
    let match = useMatch('/profile/:userId/');
    return <ProfileContainer {...props} match={match}/>;
}

export default connect(mapStateToProps, {
    setCurrentUser
})(WithUrlDataContainerComponent)