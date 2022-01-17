import React from 'react';
import {MyPosts} from "./MyPosts/MyPosts";
import {ProfileInfo} from './MyPosts/ProfileInfo/ProfileInfo';
import {PostType} from '../../redux/state'
import {AddPostPropsType, NewPostTextUpdatingPropsType} from '../../redux/profile-reducer'

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