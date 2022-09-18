import React from 'react';
import s from "./Post.module.css";
import {UserInput} from "../components/UserInput";
import {useAppSelector} from "../../../hooks/hooks";
import defaultUserPhoto from "../../../assets/images/default-user.png";
import {PostType} from "../../../redux/profileSlice";

type PropsType = {
    post: PostType
}

export const Post = ({post}: PropsType) => {
    const userPhoto = useAppSelector(state => state.profilePage.currentProfile.photo)
    const userName = useAppSelector(state => state.profilePage.currentProfile.fullName)

    return (
        <div className={s.item}>
            <div className={s.userInfo}>
                <img src={userPhoto ? userPhoto : defaultUserPhoto}
                     alt={'avatar'}/>
                <div className={s.nameAndDate}>
                    <div className={s.userName}>{userName}</div>
                    <div className={s.postDate}>{post.date}</div>
                </div>
            </div>
            <div className={s.postText}>{post.post}</div>
            <div className={s.postPhotos}></div>
            <div className={s.postStatistics}>
                <span>{post.commentsCount} comments</span>
                <span>{post.likesCount} likes</span>
                <span>{post.shareCount} share</span>
                <span>{post.savedCount} saved</span>
            </div>
            <div className={s.addComment}>
                <UserInput placeholder={"Write your comment..."} buttonText={"Add comment"}/>
            </div>
        </div>
    )
}