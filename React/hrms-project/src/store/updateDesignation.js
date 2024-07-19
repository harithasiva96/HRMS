import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateDesignation } from '../api/updateDesignation';

const initialState = {
    status: 'idle',
    data: null,
    error: null,
};

export const updateDesignationData = createAsyncThunk(
    'updateDesig/updateDesignation',
    async ({ designation_id, data, successCB, errorCB }) => {
        const response = await updateDesignation({designation_id, data, successCB, errorCB});
        return response;
    }
);

export const updateDesignationSlice = createSlice({
    name: 'updateDesig',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(updateDesignationData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateDesignationData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                state.error = null;
            })
            .addCase(updateDesignationData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default updateDesignationSlice.reducer;
