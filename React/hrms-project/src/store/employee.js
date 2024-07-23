import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {getEmployee} from "../api/employee"


const initialState = {
    status : "idle",
    data: [],
}

export const getEmployeeData = createAsyncThunk(
        "employeeData/getEmployee",
        async () => {
            const response = await getEmployee()
            return response;
        }

)


export const employeeDataSlice = createSlice ({
    name: "employeeData",
    initialState:initialState,
    reducer:{},
    extraReducers(builder){
        builder
        .addCase(getEmployeeData.pending, (state) => {
            // console.log("pending");
            state.status = 'loading';
          })
        .addCase(getEmployeeData.fulfilled, (state,action) => {
            state.status = 'succeeded';
            state.data = action.payload; 
           
          })
        .addCase(getEmployeeData.rejected, (state) => {
            state.status = 'failed';
          });

       
      },
    });
    
export default employeeDataSlice.reducer;
  

