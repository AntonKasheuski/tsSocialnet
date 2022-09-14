import {getPageUsers} from "../../redux/usersSlice";
import React, {useEffect} from "react";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {Pagination} from "../../features/pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

export const UsersPage = () => {
    const pageNumber = useAppSelector(state => state.usersPage.currentPage)
    const pageSize = useAppSelector(state => state.usersPage.pageSize)
    const isFetching = useAppSelector(state => state.usersPage.isFetching)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getPageUsers({pageNumber, pageSize}))
    }, [dispatch])

    return <>
        <Pagination/>
        {isFetching
            ? <Preloader/>
            : <Users/>}
    </>
}