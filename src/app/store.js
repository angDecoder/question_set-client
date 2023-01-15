import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import challengeReducer from '../features/challengesSlice';

const store = configureStore({
    reducer : {
        user : userReducer,
        challenge : challengeReducer
    }
});

export default store;