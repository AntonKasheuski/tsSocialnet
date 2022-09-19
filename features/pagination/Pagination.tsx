import React, {useState} from 'react';
import s from "../../components/Users/Users.module.css";
import {useDispatch} from "react-redux";
import {getPageUsers} from "../../redux/usersSlice";
import {useAppSelector} from "../../hooks/reduxToolkitHooks";

export const Pagination = ({showFollowedUsers}: {showFollowedUsers: boolean}) => {
    const portionSize = 10
    const totalUsersCount = useAppSelector(state => state.usersPage.totalUsersCount)
    const pageSize = useAppSelector(state => state.usersPage.pageSize)
    const currentPage = useAppSelector(state => state.usersPage.currentPage)
    const dispatch = useDispatch()

    let pagesCount = Math.ceil(totalUsersCount / pageSize)

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let pagePortionLeftBorder = (portionNumber - 1) * portionSize + 1
    let pagePortionRightBorder = portionNumber * portionSize

    const onPageChanged = (pageNumber: number) => {
        dispatch(getPageUsers({pageNumber, pageSize, showFollowedUsers}))
    }

    return (
        <div>
            {portionNumber > 1
                && <>
                    <button onClick={() => setPortionNumber(1)}>{`<<`}</button>
                    <button onClick={() => setPortionNumber(portionNumber - 1)}>prev</button>
                </>}
            {pages
                .filter(p => p >= pagePortionLeftBorder && p <= pagePortionRightBorder)
                .map(p => {
                    return <span key={p}
                                 className={currentPage === p ? s.selectedPage : ''}
                                 onClick={() => onPageChanged(p)}
                    >{p}|</span>
                })}
            {portionNumber < portionCount
                && <>
                    <button onClick={() => setPortionNumber(portionNumber + 1)}>next</button>
                    <button onClick={() => setPortionNumber(portionCount)}>{`>>`}</button>
                </>}
        </div>
    )
}