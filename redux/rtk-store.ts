import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./authSlice";
import dialogsReducer from "./dialogsSllice";
import profileReducer from "./profileSlice";
import usersReducer from "./usersSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        messagesPage: dialogsReducer,
        profilePage: profileReducer,
        usersPage: usersReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch