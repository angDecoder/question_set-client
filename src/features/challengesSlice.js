import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import { 
    getAllChallengesApi,
    addNewChallengeApi
} from '../api/Challenges';

const initialState = {
    challenges : []
}

export const getAllChallenges = createAsyncThunk(
    'challenge/all',
    getAllChallengesApi
)

export const addNewChallenge = createAsyncThunk(
    'challenge/add',
    addNewChallengeApi
)

const challengeSlice = createSlice({
    name: 'challenge',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllChallenges.fulfilled, (state, { payload }) => {
                // console.log('payload',payload);
                state.challenges = payload.data;
            })
            .addCase(addNewChallenge.fulfilled,(state,{ payload })=>{
                const challenge = payload.challenge;
                state.challenges.push(challenge);
            })
    }
});

export default challengeSlice.reducer;