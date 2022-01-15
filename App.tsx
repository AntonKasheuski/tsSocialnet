import React from 'react';
import './App.css';
import {Dialogs} from './components/Dialogs/Dialogs';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {News} from './components/News/News';
import {Music} from './components/Music/Music';
import {Settings} from './components/Settings/Settings';
import {Routes, Route, Navigate} from 'react-router-dom';
import {StoreType} from "./redux/state";

type PropsType = {
    store: StoreType
}

function App(props: PropsType) {

    const state = props.store.getState();

    return (
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/profile"/>}/>
                        <Route path="/profile" element={<Profile
                            posts={state.profilePage.posts}
                            newPostText={state.profilePage.newPostText}
                            newPostTextUpdating={props.store.newPostTextUpdating.bind(props.store)}
                            addPost={props.store.addPost.bind(props.store)}
                            />}
                        />
                        <Route path="/dialogs" element={<Dialogs
                            dialogs={state.messagesPage.dialogs}
                            messages={state.messagesPage.messages}
                            newMessageText={state.messagesPage.newMessageText}
                            newMessageTextUpdating={props.store.newMessageTextUpdating.bind(props.store)}
                            addMessage={props.store.addMessage.bind(props.store)}
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
