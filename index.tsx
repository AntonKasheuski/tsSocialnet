import ReactDOM from "react-dom";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import state, {newMessageTextUpdating, addPost, newPostTextUpdating, addMessage} from "./redux/state";
import {subscribe} from "./redux/state"

const rerenderEntireTree = () => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App
                    posts={state.profilePage.posts}
                    newPostText={state.profilePage.newPostText}
                    newPostTextUpdating={newPostTextUpdating}
                    addPost={addPost}
                    dialogsData={state.messagesPage}
                    newMessageTextUpdating={newMessageTextUpdating}
                    addMessage={addMessage}
                />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}

rerenderEntireTree();

subscribe(rerenderEntireTree)
