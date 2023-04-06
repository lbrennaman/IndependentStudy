import { configureStore } from '@reduxjs/toolkit';
import dragZoneReducer from './reducer';

const store = configureStore({
    reducer: {
        dragZone: dragZoneReducer
    }
});

export default store;