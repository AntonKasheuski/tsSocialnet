import React from 'react';
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";

type postType = {
    id: number,
    message: string,
    likesCount: number
}

type postDataPropsType = {
    postData: Array<postType>
}

export function MyPosts(props: postDataPropsType) {

    let postsElements = props.postData.map( (post: postType) => <Post message={post.message} likesCount={post.likesCount}/>);

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