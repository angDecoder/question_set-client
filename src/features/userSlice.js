import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useToast from "../hooks/useToast";
import axios from "axios";

const initialState = {
    username: '',
    email: "",
    accessToken: '',
    loggedIn: false
}

export const loginUser = createAsyncThunk(
    'user/login',
    async ({ email, password, navigate, from }, thunkApi) => {
        const createToast = useToast();
        const toast = createToast({ text: 'logging in', type: 'promise-pending' });

        try {
            const res = await axios.post('http://localhost:3500/user/login', {
                email,
                password
            });
            navigate(from, { replace: true });
            return { data: res.data.user, toast };
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue({ message: error.response.data.message, toast });
        }
    }
);

export const autoLoginUser = createAsyncThunk(
    'user/autologin',
    async ({ refreshToken }, thunkApi) => {
        const createToast = useToast();
        const toast = createToast({ text: 'logging in', type: 'promise-pending' });

        try {
            const res = await axios.post('http://localhost:3500/user/autologin', {
                refreshToken
            });
            return { data: res.data.user, toast };
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue({ message: error.response.data.message, toast });
        }
    }
)

export const logoutUser = createAsyncThunk(
    'user/logout',
    async ({ email },thunkApi) => {
        const createToast = useToast();
        const toast = createToast({ text: 'signing out', type: 'promise-pending' });

        try {
            const res = await axios.post('http://localhost:3500/user/logout', {
                email
            });
            return { toast };
        } catch (error) {
            console.log(error);
            return thunkApi.rejectWithValue({ message: error.response.data.message, toast });
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.username = payload.data.username;
                state.email = payload.data.email;
                state.accessToken = payload.data.accessToken;
                state.loggedIn = true;
                localStorage.setItem('questionset_jwt', payload.data.refreshToken);
                payload.toast.update({ text: `logged in as "${state.username}"`, type: "promise-resolved" });
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                payload.toast.update({ text: payload.message || "not logged in", type: "promise-rejected" });
            })
            .addCase(autoLoginUser.fulfilled, (state, { payload }) => {
                state.username = payload.data.username;
                state.email = payload.data.email;
                state.accessToken = payload.data.accessToken;
                state.loggedIn = true;
                payload.toast.update({ type: 'promise-resolved', text: `logged in as "${state.username}"` });
            })
            .addCase(autoLoginUser.rejected, (state, { payload }) => {
                payload.toast.update({ type: 'promise-rejected', text: payload?.message || 'not logged in' });
            })
            .addCase(logoutUser.fulfilled, (state, { payload }) => {
                payload.toast.update({ type: 'promise-resolved', text: `"${state.username}" logged out` });
                state.username = "";
                state.email = "";
                state.accessToken = "";
                state.loggedIn = false;
                localStorage.setItem('questionset_jwt', '');
            })
            .addCase(logoutUser.rejected, (state, { payload }) => {
                payload.toast.update({ type: 'promise-rejected', text: payload?.message || 'not logged in' });
                state.username = "";
                state.email = "";
                state.accessToken = "";
                state.loggedIn = false;
                localStorage.setItem('questionset_jwt', '');
            })
    }
})

export default userSlice.reducer;