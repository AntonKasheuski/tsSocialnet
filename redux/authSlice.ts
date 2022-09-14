import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {authAPI} from "../api/api";


type AuthorizationCheckReturnType = {
    data: { id: number, email: string, login: string },
    resultCode: number,
    messages: string[],
}
export const authorizationCheck = createAsyncThunk(
    'auth/authorizationCheck',
    async () => {
        return await authAPI.authorizationCheck() as AuthorizationCheckReturnType
    }
)

type LogInInputType = {
    email: string,
    password: string,
    rememberMe: boolean,
}
type LogInReturnType = {
    data: {},
    resultCode: number,
    messages: string[],
}
export const logIn = createAsyncThunk(
    'auth/logIn',
    async ({email, password, rememberMe}: LogInInputType, thunkAPI) => {
        let res = await authAPI.logIn(email, password, rememberMe) as LogInReturnType
        if (res.resultCode === 0) {
            thunkAPI.dispatch(authorizationCheck())
        } else {
            return res.messages[0]
        }
    }
)

type LogOutReturnType = {
    data: {},
    resultCode: number,
    messages: string[],
}
export const logOut = createAsyncThunk(
    'auth/logOut',
    async () => {
        return await authAPI.logOut() as LogOutReturnType
    }
)


export type AuthType = {
    userId: number
    email: string
    login: string
    isFetching: boolean
    isAuth: boolean
    errorMessage: string | null
}
const initialState: AuthType = {
    userId: NaN,
    email: "",
    login: "",
    isFetching: false,
    isAuth: false,
    errorMessage: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUserData: (state, action: PayloadAction<{ userId: number, email: string, login: string, isAuth: boolean }>) => {
            state.userId = action.payload.userId
            state.email = action.payload.email
            state.login = action.payload.login
            state.isAuth = action.payload.isAuth
        },
        toggleFetching: (state, action: PayloadAction<{ isFetching: boolean }>) => {
            state.isFetching = action.payload.isFetching
        },
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

export const {setAuthUserData, toggleFetching, setErrorMessage} = authSlice.actions

export default authSlice.reducer