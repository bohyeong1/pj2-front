import { createSlice } from "@reduxjs/toolkit";

// 오버레이 스테이트 / 모달, 드랍다운 관리 및 화면 어둡게 하는 오버레이 제어 스테이트
const overay_slice = createSlice({
    name:'overay',
    initialState:{
        open_target_id:null
    },
    reducers:{
        // toggle
        toggle_target: (state, action) => {
            state.open_target_id = state.open_target_id === action.payload.id ? null : action.payload.id
        },
        // close
        close_target:(state, action) => {
            state.open_target_id = null
        }
    }
})

// export action
export const{toggle_target, close_target} = overay_slice.actions

export default overay_slice.reducer