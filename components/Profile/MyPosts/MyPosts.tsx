import React from 'react';
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";

export type postPropsType = {
    id: number,
    message: string,
    likesCount: number
}
type postDataPropsType = {
    posts: Array<postPropsType>
}

export function MyPosts(props: postDataPropsType) {

    let postsElements = props.posts.map( (post: postPropsType) => <Post message={post.message} likesCount={post.likesCount}/>);

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