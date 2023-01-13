import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    loginUserApi,
    autologinApi,
    logoutUserApi
} from '../api/User';


const initialState = {
    username: '',
    email: "",
    accessToken: '',
    loggedIn: false
}

export const loginUser = createAsyncThunk(
    'user/login',
    loginUserApi
);

export const autoLoginUser = createAsyncThunk(
    'user/autologin',
    autologinApi
)

export const logoutUser = createAsyncThunk(
    'user/logout',
    logoutUserApi
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                // console.log(payload);
                state.username = payload.data.username;
                state.email = payload.data.email;
                state.accessToken = payload.data.accessToken;
                state.loggedIn = true;
                localStorage.setItem('questionset_jwt', payload.data.refreshToken);
                // payload.toast.update({ text: `logged in as "${state.username}"`, type: "promise-resolved" });
            })
            .addCase(autoLoginUser.fulfilled, (state, { payload }) => {
                state.username = payload.data.username;
                state.email = payload.data.email;
                state.accessToken = payload.data.accessToken;
                state.loggedIn = true;
                // payload.toast.update({ type: 'promise-resolved', text: `logged in as "${state.username}"` });
            })
            .addCase(logoutUser.fulfilled, (state, { payload }) => {
                // payload.toast.update({ type: 'promise-resolved', text: `"${state.username}" logged out` });
                state.username = "";
                state.email = "";
                state.accessToken = "";
                state.loggedIn = false;
                localStorage.setItem('questionset_jwt', '');
            })
            .addCase(logoutUser.rejected, (state, { payload }) => {
                // payload.toast.update({ type: 'promise-rejected', text: payload?.message || 'not logged in' });
                state.username = "";
                state.email = "";
                state.accessToken = "";
                state.loggedIn = false;
                localStorage.setItem('questionset_jwt', '');
            })
    }
})

export default userSlice.reducer;