import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {getEmployeeDetails} from "../api/employeeCard"

const initialState = {
    status : "idle",
    data: [],
    employeeDetails: null,  // Added state for employee details
    error: null,
}

export const getEmployeeDetailsData = createAsyncThunk(
        "employeeDetails/getEmployeeDetails",
        async (employeeId) => {
            const response = await getEmployeeDetails(employeeId)
            return response;
        }

)

export const employeeDetailsSlice = createSlice ({
    name: "employeeDetails",
    initialState:initialState,
    reducer:{},
    extraReducers(builder){
        builder
        .addCase(getEmployeeDetailsData.pending, (state) => {
            // console.log("pending");
            state.status = 'loading';
            state.error = null;
          })
        .addCase(getEmployeeDetailsData.fulfilled, (state,action) => {
            state.status = 'succeeded';
            state.employeeDetails = action.payload;
           
          })
        .addCase(getEmployeeDetailsData.rejected, (state,action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
      },
    });
    
export default employeeDetailsSlice.reducer;
  

