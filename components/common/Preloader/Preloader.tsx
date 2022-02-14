import React from 'react';
import loaderGif from "../../../assets/images/loader.gif";
import s from "../../Users/Users.module.css";

export const Preloader = () => {
    return (
        <div>
            <img src={loaderGif} className={s.loaderGif}/>
        </div>
    );
};