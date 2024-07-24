import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateEmployee } from '../api/updateEmployee';

const initialState = {
    status: 'idle',
    data: null,
    error: null,
};

export const updateEmployeeData = createAsyncThunk(
    'updateData/updateEmployee',
    async ({ employee_id, data, successCB, errorCB }) => {
        const response = await updateEmployee({employee_id, data, successCB, errorCB});
        return response;
    }
);

export const updateEmployeeSlice = createSlice({
    name: 'updateData',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(updateEmployeeData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateEmployeeData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                // state.error = null;
            })
            .addCase(updateEmployeeData.rejected, (state) => {
                state.status = 'failed';
                // state.error = action.error.message;
            });
    },
});

export default updateEmployeeSlice.reducer;
