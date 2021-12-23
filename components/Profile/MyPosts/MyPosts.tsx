import React from 'react';
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {PostType, ProfilePageType} from '../../../redux/state'

export function MyPosts(props: ProfilePageType) {

    let postsElements = props.posts.map( (post: PostType) => <Post message={post.post} likesCount={post.likesCount}/>);

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea></textarea>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}