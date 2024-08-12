import { createSlice } from "@reduxjs/toolkit";

// 모달에서 사용하는 data fetch용 state / subapp과는 fetch 분리 렌더링 분리
const modaldata_slice = createSlice({
    name:'modaldata',
    initialState:{
        modal_data:{}
    },
    reducers:{
        // key 입력
        set_modaldata : (state, action) => {
            if(state.modal_data[action.payload.key]){
                delete state.modal_data[action.payload.key]
            }
            state.modal_data = {
                ...state.modal_data,
                [action.payload.key]: action.payload.value
            }
        },
        // key 여러개 입력

        // key & value 삭제
        delete_modaldata : (state, action) => {
            delete state.modal_data[action.payload.key]
        }

        // key 초기화

    }
})

export const {set_modaldata, delete_modaldata} = modaldata_slice.actions

export default modaldata_slice.reducer