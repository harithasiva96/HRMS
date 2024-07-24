import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {postLogin} from "../api/login"


const initialState = {
    status : "idle",
    data: [],
    error: null,
}

export const postLoginData = createAsyncThunk(
        "loginData/postLogin",
        async ({data,successCB, errorCB}) => {
            const response = await postLogin(data,successCB,errorCB)
            // console.log("new data",data)
            return response?.data;
        }

)

export const loginDataSlice = createSlice ({
    name: "postlogin",
    initialState:initialState,
    reducer:{},
    extraReducers(builder){
        builder
        .addCase(postLoginData.pending, (state) => {
            // console.log("pending");
            state.status = 'loading';
          })
        .addCase(postLoginData.fulfilled, (state) => {
            state.status = 'succeeded';
           
          })
        .addCase(postLoginData.rejected, (state) => {
            state.status = 'failed';
          });
      },
    });
    
export default loginDataSlice.reducer;
  
