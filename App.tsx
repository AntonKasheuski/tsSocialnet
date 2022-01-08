import React from 'react';
import './App.css';
import {Dialogs} from './components/Dialogs/Dialogs';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {News} from './components/News/News';
import {Music} from './components/Music/Music';
import {Settings} from './components/Settings/Settings';
import {Routes, Route} from 'react-router-dom';
import {PostType, MessagesPageType} from "./redux/state";

type PropsType = {
    posts: Array<PostType>
    newPostText: string
    newPostTextUpdating: (newPostText: string) => void
    addPost: () => void
    dialogsData: MessagesPageType
    newMessageTextUpdating: (newMessageText: string) => void
    addMessage: () => void
}
function App(props: PropsType) {

    return (
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path="/profile" element={<Profile
                            posts={props.posts}
                            newPostText={props.newPostText}
                            newPostTextUpdating={props.newPostTextUpdating}
                            addPost={props.addPost}
                            />}
                        />
                        <Route path="/dialogs" element={<Dialogs
                            dialogsData={props.dialogsData}
                            newMessageTextUpdating={props.newMessageTextUpdating}
                            addMessage={props.addMessage}
                        />}
                        />
                        <Route path="/news" element={<News/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                    </Routes>
                </div>
            </div>
    )
}

export default App;
