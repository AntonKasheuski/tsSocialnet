import React from 'react';
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from './MyPosts/ProfileInfo/ProfileInfo';
import {ProfilePageType} from '../../redux/state'

export function Profile(props: ProfilePageType) {

    return (
        <div>
            <ProfileInfo />
            <MyPosts posts={props.posts} />
        </div>
    )
}