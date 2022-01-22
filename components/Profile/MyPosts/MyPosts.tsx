import React, {ChangeEvent} from 'react';
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {PostType} from '../../../redux/profile-reducer'

type PropsType = {
    posts: Array<PostType>
    newPostText: string
    newPostTextUpdating: (newPostText: string) => void
    addPost: () => void
}

export function MyPosts(props: PropsType) {
    let postsElements = props.posts.map( (post: PostType) => <Post key={post.id} post={post.post} likesCount={post.likesCount}/>);

    const newTextHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.newPostTextUpdating(e.currentTarget.value)
    }

    const addPostHandler = () => {
        props.addPost()
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        value={props.newPostText}
                        onChange={newTextHandler}
                        placeholder={"Enter your text"}
                    />
                </div>
                <div>
                    <button onClick={addPostHandler}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}