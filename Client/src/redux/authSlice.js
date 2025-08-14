import {createSlice} from "@reduxjs/toolkit"

const authSlice = createSlice({
    name:"auth",
    initialState:{
        user:null
    },
    reducers:{
        //actions
        setUser:(state, action) => {
            console.log("Action_Payload:",action.payload)
            state.user = action.payload;
        }
    }
});

export const {setUser} = authSlice.actions;
export default authSlice.reducer;