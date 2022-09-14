import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authorizationCheck} from "./authSlice";

export const initialization = createAsyncThunk(
    'app/initialization',
    () => {
        return authorizationCheck();
        // let promise = authorizationCheck()
        // Promise.all([promise])
        //     .then(() => {
        //         initializationSuccess()
        //     })
    }
)


export type AppType = {
    initializationSuccess: boolean
}
const initialState: AppType = {
    initializationSuccess: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        initializationSuccess: (state) => {
            state.initializationSuccess = true
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(initialization.fulfilled, (state) => {
                state.initializationSuccess = true
            })
    }
})

export const {initializationSuccess} = appSlice.actions

export default appSlice.reducer