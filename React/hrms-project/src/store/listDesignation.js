import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {getDesignation} from "../api/listDesignation"

const initialState = {
    status : "idle",
    data: [],
}

export const getDesignationData = createAsyncThunk(
        "designationData/getDesignation",
        async () => {
            const response = await getDesignation()
            return response;
        }

)

export const designationDataSlice = createSlice ({
    name: "designationData",
    initialState:initialState,
    reducer:{},
    extraReducers(builder){
        builder
        .addCase(getDesignationData.pending, (state) => {
            // console.log("pending");
            state.status = 'loading';
          })
        .addCase(getDesignationData.fulfilled, (state,action) => {
            state.status = 'succeeded';
            state.data = action.payload; 
           
          })
        .addCase(getDesignationData.rejected, (state) => {
            state.status = 'failed';
          });
      },
    });
    
export default designationDataSlice.reducer;
  

