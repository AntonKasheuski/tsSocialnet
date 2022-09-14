import React from 'react';
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {PostType} from '../../../redux/profile-reducer'
import {NewPostForm} from "./NewPostForm/NewPostForm";
import {useAppSelector} from "../../../hooks/hooks";

export function MyPosts() {
    const posts = useAppSelector(state => state.profilePage.posts)

    let postsElements = posts.map((post: PostType) => <Post key={post.id} post={post.post}
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