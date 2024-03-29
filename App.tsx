import React, {useEffect} from 'react';
import './App.css';
import {Dialogs} from './components/Dialogs/Dialogs';
import {Navbar} from "./components/Navbar/Navbar";
import {News} from './components/News/News';
import {Music} from './components/Music/Music';
import {Settings} from './components/Settings/Settings';
import {Routes, Route, Navigate} from 'react-router-dom';
import {UsersPage} from "./components/Users/UsersPage";
import Login from "./components/Login/Login";
import {Preloader} from "./components/common/Preloader/Preloader";
import {Header} from "./components/Header/Header";
import {useAppDispatch, useAppSelector} from "./hooks/reduxToolkitHooks";
import {Profile} from "./components/Profile/Profile";
import {authorizationCheck} from "./redux/authSlice";
import {getStatus, setUser} from "./redux/profileSlice";
import {Posts} from "./components/Posts/Posts";
import {ChatPage} from "./components/Chat/ChatPage";


function App() {
    const userId = useAppSelector(state => state.auth.userId)
    const initializationSuccess = useAppSelector(state => state.auth.initializationSuccess)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(authorizationCheck())
    }, [dispatch])

    useEffect(() => {
        if (!isNaN(userId)) {
            dispatch(setUser(userId))
            dispatch(getStatus(userId))
        }
    }, [dispatch, userId])

    if (!initializationSuccess) {
        return <Preloader/>
    } else {
        return <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path="/" element={<Navigate replace to={'/profile/' + userId}/>}/>
                    <Route path="/posts" element={<Posts/>}/>
                    <Route path="/profile/*" element={<Profile/>}/>
                    <Route path="/dialogs" element={<Dialogs/>}/>
                    <Route path="/users" element={<UsersPage/>}/>
                    <Route path="/chat" element={<ChatPage/>}/>
                    <Route path="/news" element={<News/>}/>
                    <Route path="/music" element={<Music/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </div>
        </div>
    }
}

export default App;
