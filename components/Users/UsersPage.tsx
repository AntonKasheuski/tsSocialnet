import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getStartPageUsers} from "../../redux/users-reducer";
import React, {useEffect} from "react";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {Pagination} from "../../features/pagination/Pagination";


export const UsersPage = () => {
    const currentPage = useSelector<AppStateType, number>(state => state.usersPage.currentPage)
    const pageSize = useSelector<AppStateType, number>(state => state.usersPage.pageSize)
    const isFetching = useSelector<AppStateType, boolean>(state => state.usersPage.isFetching)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getStartPageUsers(currentPage, pageSize))
    }, [])

    return <>
        <Pagination/>
        {isFetching
            ? <Preloader/>
            : <Users/>}
    </>
}