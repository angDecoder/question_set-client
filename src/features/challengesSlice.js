import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import { 
    getAllChallengesApi,
    addNewChallengeApi,
    deleteChallengeApi,
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

export const deleteChallenge = createAsyncThunk(
    'challenge/delete',
    deleteChallengeApi
)



const challengeSlice = createSlice({
    name: 'challenge',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllChallenges.fulfilled, (state, { payload }) => {
                // console.log('payload',payload);
                payload.data.forEach(elem=>elem.questions = []);
                state.challenges = payload.data;
            })
            .addCase(addNewChallenge.fulfilled,(state,{ payload })=>{
                const challenge = payload.challenge;
                // console.log(payload);
                // challenge.questions = [];
                state.challenges.push(challenge);
            })
            .addCase(deleteChallenge.fulfilled,(state,{ payload })=>{
                // console.log(payload);
                state.challenges = state.challenges.filter(elem=>elem.id!==payload.id);
            })

    }
});

export default challengeSlice.reducer;