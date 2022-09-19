import React, {useState} from 'react';
import s from "./UserInput.module.css";
import defaultUserPhoto from "../../../assets/images/default-user.png";
import {useAppSelector} from "../../../hooks/reduxToolkitHooks";

type PropsType = {
    placeholder: string
    buttonText: string
    onClickCallback?: (inputValue: string) => void
}

export const UserInput = ({placeholder, buttonText, onClickCallback}: PropsType) => {
    let userPhoto = useAppSelector(state => state.profilePage.currentProfile.photo)

    const [inputValue, setInputValue] = useState('')

    const onClickHandler = () => {
        onClickCallback && onClickCallback(inputValue)
        setInputValue('')
    }

    return (
        <div className={s.newPostInputBlock}>
            <img src={userPhoto ? userPhoto : defaultUserPhoto} className={s.userPhoto} alt={'user'}/>
            <input className={s.input} placeholder={placeholder} value={inputValue}
                   onChange={(e) => setInputValue(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>{buttonText}</button>
        </div>
    );
}