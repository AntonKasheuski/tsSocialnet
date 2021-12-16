import React from 'react';
import s from "./Profile.module.css";
import {MyPosts} from "./MyPosts/MyPosts";

export function Profile() {
    return (
        <div className={s.content}>
            <div>
                <img src={'https://www.smartertravel.com/wp-content/uploads/2017/04/shutterstock_446690092-1400x500.jpg'}/>
            </div>
            <div>
                avatar + description
            </div>
            <MyPosts />
        </div>
    )
}