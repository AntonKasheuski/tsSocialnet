import React from 'react';
import {Profile} from "./Profile";
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType, setUserProfile} from "../../redux/profile-reducer";
import {useMatch} from "react-router-dom";
import {profileAPI} from "../../api/api";

class ProfileContainer extends React.Component<WithUrlDataContainerComponentPropsType> {
    componentDidMount() {
        let userId = this.props.match ? this.props.match.params.userId : '22187';
        profileAPI.getCurrentUser(userId)
            .then(response => {
                this.props.setUserProfile(response)
            });
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
    setUserProfile: (profile: ProfileType) => void
}

export type ProfilePagePropsType = MapStateToPropsType & MapDispatchPropsType

type MatchPropsType = {
    match: any
}
type WithUrlDataContainerComponentPropsType = ProfilePagePropsType & MatchPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
})

const WithUrlDataContainerComponent = (props: ProfilePagePropsType): JSX.Element => {
    let match = useMatch('/profile/:userId/');
    return <ProfileContainer {...props} match={match}/>;
}

export default connect(mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent)