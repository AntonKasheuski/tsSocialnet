import React from 'react';
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from './MyPosts/ProfileInfo/ProfileInfo';
import {AddPostPropsType, NewPostTextUpdatingPropsType, PostType} from '../../redux/state'

type PropsType = {
    posts: Array<PostType>
    newPostText: string
    dispatch: (action: NewPostTextUpdatingPropsType | AddPostPropsType) => void
}

export function Profile(props: PropsType) {

    return (
        <div>
            <ProfileInfo />
            <MyPosts
                posts={props.posts}
                newPostText={props.newPostText}
                dispatch={props.dispatch}
            />
        </div>
    )
}