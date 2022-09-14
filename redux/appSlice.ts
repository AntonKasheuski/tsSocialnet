import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authorizationCheck} from "./authSlice";

const initialization = createAsyncThunk(
    'app/initialization',
    (_, thunkAPI) => {
        thunkAPI.dispatch(authorizationCheck())
    }
)

type AppType = {
    initializationSuccess: boolean
}
const initialState: AppType = {
    initializationSuccess: false,
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {},
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(initialization.fulfilled, (state) => {
    //             state.initializationSuccess = true
    //         })
    // }
})
