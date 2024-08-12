import { createSlice } from "@reduxjs/toolkit";

// modal list - hover
const listhover_slice = createSlice({
    name:'listhover',
    initialState:{
        listhover_target:{}
    },
    reducers:{
        // 처음 리스트 호버
        set_listhover_target: (state, action) => {
            state.listhover_target =  {
                ...state.listhover_target,
                [action.payload.key]: action.payload.value
            }
        },
        // 호버 삭제
        delete_listhover_target:(state, action) => {
            delete state.listhover_target[action.payload.key]
        },
        // 호버 초기화
        initialized_listhover_target:(state, action) => {
            state.listhover_target = {}
        }
    }
})

// export action
export const{set_listhover_target, delete_listhover_target, initialized_listhover_target} = listhover_slice.actions


export default listhover_slice.reducer
