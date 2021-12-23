import React from 'react';
import './App.css';
import {Dialogs} from './components/Dialogs/Dialogs';
import {Header} from "./components/Header/Header";
import {Navbar} from "./components/Navbar/Navbar";
import {Profile} from "./components/Profile/Profile";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {News} from './components/News/News';
import {Music} from './components/Music/Music';
import {Settings} from './components/Settings/Settings';
import {postPropsType} from "./components/Profile/MyPosts/MyPosts";
import {dialogPropsType} from "./components/Dialogs/DialogItem/DialogItem";
import {messagePropsType} from "./components/Dialogs/Message/Message";

type dataPropsType = {
    dialogs: Array<dialogPropsType>
    messages: Array<messagePropsType>
    posts: Array<postPropsType>
}

function App(props: dataPropsType) {

    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Routes>
                        <Route path="/profile" element={<Profile posts={props.posts}/>}/>
                        <Route path="/dialogs" element={<Dialogs dialogs={props.dialogs} messages={props.messages} />}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    )
}

export default App;
