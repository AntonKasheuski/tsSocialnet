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
import store from "./redux/redux-store"

function App() {

    const state = store.getState();

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
                            dispatch={store.dispatch.bind(store)}
                            />}
                        />
                        <Route path="/dialogs" element={<Dialogs
                            dialogs={state.dialogsPage.dialogs}
                            messages={state.dialogsPage.messages}
                            newMessageText={state.dialogsPage.newMessageText}
                            dispatch={store.dispatch.bind(store)}
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
