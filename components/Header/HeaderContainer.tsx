import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {authorizationCheck, AuthType} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<AuthPropsType> {
    componentDidMount() {
        this.props.authorizationCheck()
    }

    render() {
        return <Header {...this.props} />
    }
}

type MapDispatchPropsType = {
    authorizationCheck: () => void
}
export type AuthPropsType = AuthType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): AuthType => {
    return {
        userId: state.auth.userId,
        email: state.auth.email,
        login: state.auth.login,
        isFetching: state.auth.isFetching,
        isAuth: state.auth.isAuth,
    }
}

export default connect(mapStateToProps, {
    authorizationCheck
})(HeaderContainer)