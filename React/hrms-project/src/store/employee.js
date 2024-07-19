import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import {getEmployee} from "../api/employee"
// import axios from 'axios';

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

// export const updateEmployeeLeave = createAsyncThunk(
//   'employee/updateEmployeeLeave',
//   async ({ employeeId, totalLeaves }) => {
//     const response = await axios.put(`/api/employees/${employeeId}`, { total_leaves_used: totalLeaves });
//     return response.data;
//   }
// );

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

        // .addCase(updateEmployeeLeave.fulfilled, (state, action) => {
        //     const { employeeId,  total_leaves_used } = action.payload;
        //     const employee = state.data.find(emp => emp.employee_id === employeeId);
        //     if (employee) {
        //       employee.total_leaves_used = total_leaves_used;
        //     }
        //   })
      },
    });
    
export default employeeDataSlice.reducer;
  

