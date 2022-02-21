import React from 'react';
import {Header} from "./Header";
import axios from "axios";
import {connect} from "react-redux";
import {AuthType, setAuthUserData, toggleFetching} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

class HeaderContainer extends React.Component<AuthPropsType> {
    componentDidMount() {
        this.props.toggleFetching(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(response => {
                this.props.toggleFetching(false)
                if (response.data.resultCode === 0) {
                    this.props.setAuthUserData(
                        response.data.data.id,
                        response.data.data.email,
                        response.data.data.login
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