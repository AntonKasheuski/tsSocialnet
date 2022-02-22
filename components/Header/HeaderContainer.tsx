import React from 'react';
import {Header} from "./Header";
import {connect} from "react-redux";
import {AuthType, setAuthUserData, toggleFetching} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import {authAPI} from "../../api/api";

class HeaderContainer extends React.Component<AuthPropsType> {
    componentDidMount() {
        this.props.toggleFetching(true)
        authAPI.authorizationCheck()
            .then(response => {
                this.props.toggleFetching(false)
                if (response.resultCode === 0) {
                    this.props.setAuthUserData(
                        response.data.id,
                        response.data.email,
                        response.data.login
                    )
                }
            });
    }

    render() {
        return <Header {...this.props} />
    }
}

type MapDispatchPropsType = {
    setAuthUserData: (userId: number, email: string, login: string) => void
    toggleFetching: (isFetching: boolean) => void
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
    setAuthUserData,
    toggleFetching,
})(HeaderContainer)