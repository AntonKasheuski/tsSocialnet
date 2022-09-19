import React from 'react';
import s from "./Posts.module.css";
import {Post} from "./Post/Post";
import {addPost, PostType} from '../../redux/profileSlice'
import {useAppDispatch, useAppSelector} from "../../hooks/reduxToolkitHooks";
import {Navigate} from "react-router-dom";
import {UserInput} from "./components/UserInput";

export function Posts() {
    const posts = useAppSelector(state => state.profilePage.posts)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch()

    if (!isAuth) return <Navigate replace to="/login"/>

    const onClickHandler = (inputValue: string) => {
        const today = new Date()
        const date = today.toLocaleString().slice(0, -3)
        dispatch(addPost({inputValue, date}))
    }

    let postsElements = posts.map((post: PostType) => <Post key={post.id} post={post}/>);

    return (
        <div className={s.mainBlock}>
            <div className={s.newPostBlock}>
                <div className={s.postSomething}>Post something</div>
                <UserInput placeholder={"What's on your mind?"} buttonText={"Create post"}
                           onClickCallback={onClickHandler}/>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}