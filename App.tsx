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
import Login from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {initialization} from "./redux/appSlice";
import {AppStateType} from "./redux/redux-store";
import {Preloader} from "./components/common/Preloader/Preloader";
import {Header} from "./components/Header/Header";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {Profile} from "./components/Profile/Profile";


function App() {
    const initializationSuccess = useAppSelector(state => state.app.initializationSuccess)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initialization())
    }, [])

    if (!initializationSuccess) {
        return <Preloader/>
    } else {
        return <div className='app-wrapper'>
            <Header/>
            <Navbar/>
            <div className='app-wrapper-content'>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/profile"/>}/>
                    <Route path="/profile/*" element={<Profile/>}/>
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
