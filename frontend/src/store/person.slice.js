import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    people : []
}

export const personAction = (persons)=>{
    return {
       type: 'person/setPeople',
       payload: {persons:persons},
    }
}

export const personSlice = createSlice({
    name: 'person',
    initialState,
    reducers: {
        setPeople: (state, {payload}) =>{
            return {
                ...state,
                people: payload.persons
            }
        }
    }
})
export const personSelector = (state) =>state.person.people;
export default personSlice.reducer