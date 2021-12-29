import React from 'react';
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from './MyPosts/ProfileInfo/ProfileInfo';
import {PostType} from '../../redux/state'

type PropsType = {
    posts: Array<PostType>
    addPost: (postText: string) => void
}

export function Profile(props: PropsType) {

    return (
        <div>
            <ProfileInfo />
            <MyPosts posts={props.posts} addPost={props.addPost} />
        </div>
    )
}