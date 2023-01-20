import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import { 
    getAllChallengesApi,
    addNewChallengeApi,
    deleteChallengeApi,
} from '../api/Challenges';

import {
    addNewQuestionApi,
    getAllQuestionApi
} from '../api/Question';

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

export const getQuestion = createAsyncThunk(
    'challenge/question/all',
    getAllChallengesApi
);

export const addNewQuestion = createAsyncThunk(
    'challenge/question/add',
    addNewQuestionApi
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
                challenge.questions = [];
                state.challenges.push(challenge);
            })
            .addCase(deleteChallenge.fulfilled,(state,{ payload })=>{
                // console.log(payload);
                state.challenges = state.challenges.filter(elem=>elem.id!==payload.id);
            })
            .addCase(getQuestion.fulfilled,( state, { payload } )=>{
                // const questons = payload.questions;
                state.challenges.forEach(elem=>{
                    if( elem.id===payload.id ){
                        elem.questions = payload.questions;
                        return;
                    }
                })
            })
            .addCase(addNewQuestion.fulfilled,( state,{ payload } )=>{
                state.challenges.forEach(elem=>{
                    if( elem.id===payload.id ){
                        elem.questions.push(payload.question);
                        return;
                    }
                })
            })
    }
});

export default challengeSlice.reducer;