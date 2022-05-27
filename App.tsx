import React, {useEffect} from 'react';
import './App.css';
import {Dialogs} from './components/Dialogs/Dialogs';
import {Navbar} from "./components/Navbar/Navbar";
import {News} from './components/News/News';
import {Music} from './components/Music/Music';
import {Settings} from './components/Settings/Settings';
import {Routes, Route, Navigate} from 'react-router-dom';
import {UsersPage} from "./components/Users/UsersPage";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {initialization} from "./redux/app-reducer";
import {AppStateType} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";


function App() {
    const initializationSuccess = useSelector<AppStateType, boolean>(state => state.app.initializationSuccess)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initialization())
    }, [])

    if (!initializationSuccess) {
        return <Preloader/>
    } else {
        return <div className='app-wrapper'>
            <HeaderContainer/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/profile"/>}/>
                    <Route path="/profile/*" element={<ProfileContainer/>}/>
                    <Route path="/dialogs" element={<Dialogs/>}/>
                    <Route path="/users" element={<UsersPage/>}/>
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
