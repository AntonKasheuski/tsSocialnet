import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {authorizationCheck, logOut, AuthType} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<AuthPropsType> {
    componentDidMount() {
        this.props.authorizationCheck()
    }

    logOutHandler = () => {
        this.props.logOut()
    }

    render() {
        return <Header {...this.props} logOutHandler={this.logOutHandler}/>
    }
}

type MapDispatchPropsType = {
    authorizationCheck: () => void
    logOut: () => void
}
export type AuthPropsType = AuthType & MapDispatchPropsType

const mapStateToProps = (state: AppStateType): AuthType => {
    return {
        userId: state.auth.userId,
        email: state.auth.email,
        login: state.auth.login,
        isFetching: state.auth.isFetching,
        isAuth: state.auth.isAuth,
        errorMessage: state.auth.errorMessage
    }
}

export default connect(mapStateToProps, {
    authorizationCheck, logOut
})(HeaderContainer)