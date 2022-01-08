import React from 'react';
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from './MyPosts/ProfileInfo/ProfileInfo';
import {PostType} from '../../redux/state'

type PropsType = {
    posts: Array<PostType>
    newPostText: string
    newPostTextUpdating: (newPostText: string) => void
    addPost: () => void
}

export function Profile(props: PropsType) {

    return (
        <div>
            <ProfileInfo />
            <MyPosts
                posts={props.posts}
                newPostText={props.newPostText}
                newPostTextUpdating={props.newPostTextUpdating}
                addPost={props.addPost}
            />
        </div>
    )
}