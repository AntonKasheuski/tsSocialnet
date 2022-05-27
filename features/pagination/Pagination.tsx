import React, {useState} from 'react';
import s from "../../components/Users/Users.module.css";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {getSelectedPageUsers} from "../../redux/users-reducer";

export const Pagination = ({portionSize = 10}) => {
    const totalUsersCount = useSelector<AppStateType, number>(state => state.usersPage.totalUsersCount)
    const pageSize = useSelector<AppStateType, number>(state => state.usersPage.pageSize)
    const currentPage = useSelector<AppStateType, number>(state => state.usersPage.currentPage)
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
        dispatch(getSelectedPageUsers(pageNumber, pageSize))
    }

    return (
        <div>
            {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber - 1)}>prev</button>}
            {pages
                .filter(p => p >= pagePortionLeftBorder && p <= pagePortionRightBorder)
                .map(p => {
                    return <span key={p}
                                 className={currentPage === p ? s.selectedPage : ''}
                                 onClick={() => onPageChanged(p)}
                    >{p}|</span>
                })}
            {portionNumber < portionCount && <button onClick={() => setPortionNumber(portionNumber + 1)}>next</button>}
        </div>
    )
}