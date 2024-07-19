import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {postEmployee} from "../api/addemployee"



const initialState = {
    status : "idle",
    data: null,
    error: null,
}

export const postEmployeeData = createAsyncThunk(
        "postData/postEmployee",
        async ({data,successCB, errorCB}) => {
            const response = await postEmployee(data,successCB,errorCB);
            console.log("zzzzzzzz",data)
            return response?.data;
        }

)

export const postEmployeeSlice = createSlice ({
    name: "postData",
    initialState:initialState,
    reducer:{},
    extraReducers(builder){
        builder
        .addCase(postEmployeeData.pending, (state) => {
            console.log("pending");
            state.status = 'loading';
          })
        .addCase(postEmployeeData.fulfilled, (state,action) => {
            state.status = 'succeeded';
            state.postData = action.payload;
            state.error = null;
           
          })
        .addCase(postEmployeeData.rejected, (state) => {
            state.status = 'failed';
          });
      },
    });
    
export default postEmployeeSlice.reducer;
  
