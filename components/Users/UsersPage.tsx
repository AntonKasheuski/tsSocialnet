import {getPageUsers} from "../../redux/usersSlice";
import React, {useEffect, useState} from "react";
import {Users} from "./Users";
import {Preloader} from "../common/Preloader/Preloader";
import {Pagination} from "../../features/pagination/Pagination";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxToolkitHooks";

export const UsersPage = () => {
    const pageNumber = useAppSelector(state => state.usersPage.currentPage)
    const pageSize = useAppSelector(state => state.usersPage.pageSize)
    const isFetching = useAppSelector(state => state.usersPage.isFetching)
    const dispatch = useAppDispatch()

    const [showFollowedUsers, setShowFollowedUsers] = useState(false)

    useEffect(() => {
        dispatch(getPageUsers({pageNumber, pageSize, showFollowedUsers}))
    }, [dispatch, showFollowedUsers, pageNumber, pageSize])

    return <>
        <input type={"checkbox"} onChange={() => setShowFollowedUsers(!showFollowedUsers)}/>{'show only friends'}
        <Pagination showFollowedUsers={showFollowedUsers}/>
        {isFetching
            ? <Preloader/>
            : <Users/>}
    </>
}