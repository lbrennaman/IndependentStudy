import { createSlice } from '@reduxjs/toolkit';
import * as helper from './helper'

export const dragZoneSlice = createSlice({
    name: 'dragZoneState',
    initialState: { 
        index: 0,
        blockList: []
    },
    reducers: {
        setIndex: (state, action) => {
            console.log("Setting index of DragZone to: ", action.payload);
            state.index = action.payload;
        },
    }
});

export const { setIndex } = kanjiSlice.actions;
export default dragZone.reducer;