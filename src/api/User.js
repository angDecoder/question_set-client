import useToast from "../hooks/useToast";
import axios from "axios";


export const loginUserApi = async ({ email, password, navigate, from,toast }, thunkApi) => {

    try {
        const res = await axios.post('http://localhost:3500/user/login', {
            email,
            password
        });
        navigate(from, { replace: true });
        toast.update({ type : "promise-resolved", text : `logged in as "${res.data.user.username}"` });
        return { data: res.data.user };
    } catch (error) {
        toast.update({ type : 'promise-rejected', text : error.response.data.message });
        return thunkApi.rejectWithValue({ message: error.response.data.message });
    }
}

export const autologinApi = async ({ refreshToken,toast }, thunkApi) => {

    try {
        const res = await axios.post('http://localhost:3500/user/autologin', {
            refreshToken
        });
        toast.update({ type : 'promise-resolved', text : `logged in as "${res.data.user.username}"` })
        return { data: res.data.user };
    } catch (error) {
        console.log(error);
        toast.update({ type : 'promise-rejected', text : error.response.data.message });
        return thunkApi.rejectWithValue({ message: error.response.data.message });
    }
}

export const logoutUserApi = async ({ email,toast },thunkApi) => {

    try {
        const res = await axios.post('http://localhost:3500/user/logout', {
            email
        });
        toast.update({ type : 'promise-resolved', text : "logged out" });
        return {};
    } catch (error) {
        toast.update({ type : 'promise-rejected', text : error.response.data.message  });
        console.log(error);
        return thunkApi.rejectWithValue({ message: error.response.data.message });
    }
}

export const registerUserApi = async ({ username,password,email,toast })=>{
    try {
        const res = axios.post('http://localhost:3500/user/register',{
            username,
            password,
            email
        });
        toast.update({ text : 'user registered', type : 'promise-resolved' });
        
    } catch (error) {
        toast.update({ type : 'promise-rejected', text : 'could not register user' });
        console.log(error);
    }
}