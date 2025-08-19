import { createSlice } from "@reduxjs/toolkit";

const lectureSelice = createSlice({
    name:"lecture",
    initialState:{
        lecture:null
    },
    reducer:{
        setLecture:(state,action) =>{
            state.lecture = action.payload;
        }
    }
})

export const {setLecture} = lectureSelice.actions;
export default lectureSelice.reducer;