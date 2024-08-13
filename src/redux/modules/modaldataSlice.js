import { createSlice } from "@reduxjs/toolkit";

// 모달에서 사용하는 data fetch용 state / subapp과는 fetch 분리 렌더링 분리
const modaldata_slice = createSlice({
    name:'modaldata',
    initialState:{
        modal_data:{}
    },
    reducers:{
        // key 한개 toggle data 입력
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
        add_modaldata : (state, action) => {
            if(!state.modal_data[action.payload.key]){
                state.modal_data = {
                    ...state.modal_data,
                    [action.payload.key]:[action.payload.value]
                }
            }
            else{
                state.modal_data[action.payload.key].push(action.payload.value)
            }
        },

        // key & value 삭제
        delete_modaldata : (state, action) => {

            // 단일 조건 필터(문자열)
            if(typeof state.modal_data[action.payload.key] === 'string'){
                delete state.modal_data[action.payload.key]
            }
            // 중복 조건 필터(배열)
            else if(Array.isArray(state.modal_data[action.payload.key])){
                const key = action.payload.key
                const copied_obj = Array.from(state.modal_data[key]) 
                const value = action.payload.value
                const index = state.modal_data[key].indexOf(value)

                if(typeof index !== -1){
                    copied_obj.splice(index, 1)
                    state.modal_data[key] = copied_obj

                    // 빈배열 될 경우 키 밸류값 삭제 /// utill hook안에서 에러처리 안해놨음 여기서 해야함
                    if (state.modal_data[key].length === 0) {
                        delete state.modal_data[key]
                    }
                }else{
                    console.log('에러',index,value)
                }
            }
            // 추후 조건 추가 및 에러처리
            else{
                console.log(state.modal_data[action.payload.key])
            }
        },

        // key 초기화
        initialized_modaldata : (state, action) => {
            state.modal_data = {}
        }
    }
})

export const {set_modaldata, delete_modaldata, add_modaldata, initialized_modaldata} = modaldata_slice.actions

export default modaldata_slice.reducer