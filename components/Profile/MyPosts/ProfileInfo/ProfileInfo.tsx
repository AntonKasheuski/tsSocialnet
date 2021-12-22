import React from 'react';
import s from "./ProfileInfo.module.css";
  
export function ProfileInfo() {
    return (
        <div>
            <div>
                <img src={'https://www.nycgovparks.org/facilities/images/beaches/coney-island-beach-content.jpg'}/>
            </div>
            <div className={s.descriptionBlock}>
                avatar + description
            </div>
        </div>
    )
}