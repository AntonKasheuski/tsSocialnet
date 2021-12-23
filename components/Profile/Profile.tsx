import React from 'react';
import {MyPosts, postPropsType} from "./MyPosts/MyPosts";
import {ProfileInfo} from './MyPosts/ProfileInfo/ProfileInfo';

type dataPropsType = {
    posts: Array<postPropsType>
}

export function Profile(props: dataPropsType) {

    return (
        <div>
            <ProfileInfo />
            <MyPosts posts={props.posts} />
        </div>
    )
}