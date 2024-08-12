import { createSlice } from "@reduxjs/toolkit";

// 지도 카드 스테이트 - 클릭
const map_slice = createSlice({
    name:'map',
    initialState:{
        map_target:{}
    },
    reducers:{
        // 처음 카드 찍엇을 때
        set_map_target: (state, action) => {
            state.map_target =  {
                ...state.map_target,
                [action.payload.key]: action.payload.value
            }
        },
        // 같은 카드 찍엇을 때
        delete_map_target:(state, action) => {
            delete state.map_target[action.payload.key]
        },
        // 다른 카드 직엇을 때
        update_map_target:(state, action) => {
            state.map_target = {}
            state.map_target = {...state.map_target, [action.payload.key] : action.payload.value}
        },
        // 초기화
        initailized_map_target:(state, action) => {
            state.map_target = {}
        }
    }
})

// export action
export const{set_map_target, delete_map_target, update_map_target, initailized_map_target} = map_slice.actions


export default map_slice.reducer

