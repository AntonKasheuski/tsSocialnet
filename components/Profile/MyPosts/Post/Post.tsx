import React from 'react';
import s from "./Post.module.css";

type PropsType = {
    message: string;
    likesCount: number;
}

export function Post(props: PropsType) {
    return (
        <div className={s.item}>
            <img
                src='https://pyxis.nymag.com/v1/imgs/1c4/a78/3c3b8160c9c5851d876cb3647900591e8c-cookie-monster.rsquare.w1200.jpg'/>
            {props.message}
            <div>
                <span>{props.likesCount} likes</span>
            </div>
        </div>
    )
}