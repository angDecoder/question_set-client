import { createAsyncThunk,createSlice } from '@reduxjs/toolkit';
import {
    addNewQuestionApi,
    getAllQuestionApi
} from '../api/Question';

const initialState = { 
    questions : []
 }

export const getQuestion = createAsyncThunk(
    'challenge/question/all',
    getAllQuestionApi
);

export const addNewQuestion = createAsyncThunk(
    'questions/question/add',
    addNewQuestionApi
)

const questionSlice = createSlice({
    name : 'question',
    initialState,
    reducers : {},
    extraReducers : (builder)=>{
        builder
            .addCase(getQuestion.fulfilled,(state,{ payload })=>{
                console.log(payload);
                state.questions = (payload.questions);
            })
    }
});

export default questionSlice.reducer;