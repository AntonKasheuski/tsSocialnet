const NEW_POST_TEXT_UPDATING = "NEW-POST-TEXT-UPDATING";
const ADD_POST = "ADD-POST";

export type PostType = {
    id: number,
    post: string,
    likesCount: number
}
export type ProfilePageType = {
    newPostText: string,
    posts: Array<PostType>
}
export type ProfileActionType = NewPostTextUpdatingPropsType | AddPostPropsType

export type NewPostTextUpdatingPropsType = ReturnType<typeof newPostTextUpdatingActionCreator>
export type AddPostPropsType = ReturnType<typeof addPostActionCreator>

const initialState = {
    newPostText: "",
    posts: [
        {id: 1, post: "Hi, how are you?", likesCount: 15},
        {id: 2, post: "It's my first post", likesCount: 20},
        {id: 3, post: "Bla-bla", likesCount: 30}
    ]
}

export const profileReducer = (state: ProfilePageType = initialState, action: ProfileActionType): ProfilePageType => {
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