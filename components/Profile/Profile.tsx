import React from 'react';
import {MyPosts} from "./MyPosts/MyPosts";
import { ProfileInfo } from './MyPosts/ProfileInfo/ProfileInfo';

export function Profile() {

    let postData = [
        {id: 1, message: "Hi, how are you?", likesCount: 15},
        {id: 2, message: "It's my first post", likesCount: 20}
    ]

    return (
        <div>
            <ProfileInfo />
            <MyPosts postData={postData} />
        </div>
    )
}