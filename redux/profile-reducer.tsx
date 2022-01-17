import {ActionType, PostType, ProfilePageType} from "./state";

const NEW_POST_TEXT_UPDATING = "NEW-POST-TEXT-UPDATING";
const ADD_POST = "ADD-POST";

export type NewPostTextUpdatingPropsType = ReturnType<typeof newPostTextUpdatingActionCreator>
export type AddPostPropsType = ReturnType<typeof addPostActionCreator>

const profileReducer = (state: ProfilePageType, action: ActionType) => {
    switch (action.type) {
        case NEW_POST_TEXT_UPDATING:
            state.newPostText = action.newPostText
            return state;
        case ADD_POST:
            const newPost: PostType = {
                id: 4,
                post: state.newPostText,
                likesCount: 0
            }
            state.posts.push(newPost)
            state.newPostText = ""
            return state;
        default:
            return state;
    }
}

export const newPostTextUpdatingActionCreator = (newPostText: string) => {
    return {type: NEW_POST_TEXT_UPDATING, newPostText: newPostText} as const
}
export const addPostActionCreator = () => ({type: ADD_POST} as const)

export default profileReducer;