import { createSlice } from "@reduxjs/toolkit";

// target class state
const target_class_slice = createSlice({
    name : 'target_class',
    initialState : {
        target_class : null
    },
    reducers : {
        set_target_class: (state, action) => {
            state.target_class =  action.payload ? action.payload : null
        }
    }
})

// export action
export const{set_target_class} = target_class_slice.actions

export default target_class_slice.reducer