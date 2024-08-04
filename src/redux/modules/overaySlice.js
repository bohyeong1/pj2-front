import { createSlice } from "@reduxjs/toolkit";

const overay_slice = createSlice({
    name:'overay',
    initialState:{
        open_target_id:null
    },
    reducers:{
        toggle_target: (state, action) => {
            state.open_target_id = state.open_target_id === action.payload.id ? null : action.payload.id
        }
    }
})

// export action
export const{toggle_target} = overay_slice.actions

export default overay_slice.reducer