import React from 'react'
import {ProfilePagePropsType} from "../components/Profile/ProfileContainer";
import {useMatch} from "react-router-dom";

export function withUrlDataContainerComponent(Component: any) {
    const WithUrlComponent = (props: ProfilePagePropsType) => {
        let match = useMatch('/profile/:userId/');
        return <Component {...props} match={match}/>;
    }

    return WithUrlComponent;
}