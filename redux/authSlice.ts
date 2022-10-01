import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {authAPI} from "../api/auth-api";

type LogInInputType = {
    email: string,
    password: string,
    rememberMe: boolean,
}
type ThunkReturnType<T = {}> = {
    data: T,
    resultCode: number,
    messages: string[],
}

export const authorizationCheck = createAsyncThunk(
    'auth/authorizationCheck',
    async () => {
        return await authAPI.authorizationCheck() as ThunkReturnType<{ id: number, email: string, login: string }>
    }
)
export const logIn = createAsyncThunk(
    'auth/logIn',
    async ({email, password, rememberMe}: LogInInputType, thunkAPI) => {
        let res = await authAPI.logIn(email, password, rememberMe) as ThunkReturnType
        if (res.resultCode === 0) {
            thunkAPI.dispatch(authorizationCheck())
        } else {
            return res.messages[0]
        }
    }
)
export const logOut = createAsyncThunk(
    'auth/logOut',
    async () => {
        return await authAPI.logOut() as ThunkReturnType
    }
)


export type AuthType = {
    userId: number
    email: string
    login: string
    isFetching: boolean
    isAuth: boolean
    errorMessage: string | null
    initializationSuccess: boolean
}
const initialState: AuthType = {
    userId: NaN,
    email: "",
    login: "",
    isFetching: false,
    isAuth: false,
    errorMessage: null,
    initializationSuccess: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setErrorMessage: (state, action: PayloadAction<{ errorMessage: string | null }>) => {
            state.errorMessage = action.payload.errorMessage
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authorizationCheck.pending, (state) => {
                !state.isFetching && (state.isFetching = true)
            })
            .addCase(authorizationCheck.fulfilled, (state, action) => {
                state.isFetching = false
                if (action.payload.resultCode === 0) {
                    state.userId = action.payload.data.id
                    state.email = action.payload.data.email
                    state.login = action.payload.data.login
                    state.isAuth = true
                }
                if (action.payload.resultCode === 1) {
                    state.errorMessage = action.payload.messages[0]
                }
                state.initializationSuccess = true
            })
            .addCase(logIn.pending, (state) => {
                state.isFetching = true
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.isFetching = false
                action.payload && (state.errorMessage = action.payload)
            })
            .addCase(logOut.pending, (state) => {
                state.isFetching = true
            })
            .addCase(logOut.fulfilled, (state, action) => {
                state.isFetching = false
                if (action.payload.resultCode === 0) {
                    state.userId = NaN
                    state.email = ""
                    state.login = ""
                    state.isAuth = false
                }
                if (action.payload.resultCode === 1) {
                    state.errorMessage = action.payload.messages[0]
                }
            })
    },
})

export const {setErrorMessage} = authSlice.actions

export default authSlice.reducer