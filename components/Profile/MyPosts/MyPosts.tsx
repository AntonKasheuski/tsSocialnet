import React, {ChangeEvent} from 'react';
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {PostType} from '../../../redux/profile-reducer'
import {MyPostsPropsType} from "./MyPostsContainer";
import {NewPostForm} from "./NewPostForm/NewPostForm";

export function MyPosts(props: MyPostsPropsType) {
    let postsElements = props.posts.map((post: PostType) => <Post key={post.id} post={post.post}
                                                                  likesCount={post.likesCount}/>);

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <NewPostForm/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}