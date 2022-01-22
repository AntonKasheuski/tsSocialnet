import React from 'react';
import {
    addPostActionCreator,
    newPostTextUpdatingActionCreator,
} from "../../../redux/profile-reducer";
import {MyPosts} from "./MyPosts";
import StoreContext from "../../../StoreContext"

export function MyPostsContainer() {

    return (
        <StoreContext.Consumer>
            {store => {
                const newPostTextUpdating = (text: string) => {
                    store.dispatch(newPostTextUpdatingActionCreator(text))
                }

                const addPost = () => {
                    store.dispatch(addPostActionCreator())
                }

                return <MyPosts
                    posts={store.getState().profilePage.posts}
                    newPostText={store.getState().profilePage.newPostText}
                    newPostTextUpdating={newPostTextUpdating}
                    addPost={addPost}
                />
            }}
        </StoreContext.Consumer>
    )
}