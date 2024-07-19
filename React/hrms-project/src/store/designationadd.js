import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {postDesignation} from "../api/addDesignation"



const initialState = {
    status : "idle",
    data: null,
    error: null,
}

export const postDesignationData = createAsyncThunk(
        "postdesigData/postDesignation",
        async ({data,successCB, errorCB}) => {
            const response = await postDesignation(data,successCB,errorCB);
            console.log("desig",data)
            return response?.data;
        }

)

export const postDesignationSlice = createSlice ({
    name: "postdesigData",
    initialState:initialState,
    reducer:{},
    extraReducers(builder){
        builder
        .addCase(postDesignationData.pending, (state) => {
            console.log("pending");
            state.status = 'loading';
          })
        .addCase(postDesignationData.fulfilled, (state,action) => {
            state.status = 'succeeded';
            state.postData = action.payload;
            state.error = null;
           
          })
        .addCase(postDesignationData.rejected, (state) => {
            state.status = 'failed';
          });
      },
    });
    
export default postDesignationSlice.reducer;
  
