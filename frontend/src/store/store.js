import { configureStore } from '@reduxjs/toolkit'
import personSlice from './person.slice';

export const store = configureStore({
    reducer: {
        person: personSlice,

    },
})