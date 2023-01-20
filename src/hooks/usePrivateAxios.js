import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateAccessToken } from '../features/userSlice';
import { refreshAccessToken } from '../api/User';

const BASE_URL = process.env.REACT_APP_BASE_URL;

function usePrivateAxios() {
    const accessToken = useSelector(state=>state.user.accessToken);
    const dispatch = useDispatch();
    const privateInstance = axios.create({
        baseURL: BASE_URL,
        headers : {
            Authorization : `Bearer ${accessToken}`
        }
    })
    

    useEffect(()=>{

        const requestIntercept = privateInstance.interceptors.request.use(
            config =>config,
            (error)=>Promise.reject()
        )

        const responseIntercept = privateInstance.interceptors.response.use(
            response=>response,
            async (err)=>{
                console.log('expired');
                const prevRequest = err?.config;
                if( err?.response?.status===401 && !prevRequest.sent ){
                    prevRequest.sent = true;
                    const newAccessToken = await refreshAccessToken();
                    dispatch(updateAccessToken({ accessToken : newAccessToken }));
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    console.log(newAccessToken);
                    return privateInstance(prevRequest);
                }
                else 
                    Promise.reject();
            }
        )

        return ()=>{
            privateInstance.interceptors.response.eject(responseIntercept);
            privateInstance.interceptors.request.eject(requestIntercept);
        }
    },[]);


    return privateInstance;
}

export default usePrivateAxios