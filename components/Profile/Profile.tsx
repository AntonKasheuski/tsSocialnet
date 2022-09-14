import React, {useEffect} from 'react';
import {ProfileInfo} from './MyPosts/ProfileInfo/ProfileInfo';
import {useAppSelector} from "../../hooks/hooks";
import {getStatus, setCurrentUser} from "../../redux/profileSlice";
import {MyPosts} from "./MyPosts/MyPosts";

export function Profile() {
    const userId = useAppSelector(state => state.auth.userId)

    useEffect(() => {
        setCurrentUser(userId)
        getStatus(userId)
    }, [])

    return (
        <div>
            <ProfileInfo/>
            <MyPosts/>
        </div>
    )
}