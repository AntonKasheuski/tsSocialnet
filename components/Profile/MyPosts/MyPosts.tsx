import React from 'react';
import s from "./MyPosts.module.css";
import {Post} from "./Post/Post";
import {PostType} from '../../../redux/state'

type PropsType = {
    posts: Array<PostType>
    addPost: (postText: string) => void
}

export function MyPosts(props: PropsType) {

    let postsElements = props.posts.map( (post: PostType) => <Post message={post.post} likesCount={post.likesCount}/>);

    let newPostTextRef = React.createRef<HTMLTextAreaElement>()

    const addPostHandler = () => {
        if (newPostTextRef.current) {
            props.addPost(newPostTextRef.current.value)
        }
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostTextRef}></textarea>
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