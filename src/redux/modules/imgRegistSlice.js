import { createSlice } from "@reduxjs/toolkit";

// img regist state
const img_regist_slice = createSlice({
    name:'imgregist',
    initialState:{
        img_regist_target:{
            main_img : null,
            sub_img : null
        }
    },
    reducers:{
        // set state
        set_img_regist_target: (state, action) => {
            state.img_regist_target =  {
                ...state.img_regist_target,
                [action.payload.key]: action.payload.value
            }
        },
        // delete state
        delete_img_regist_target:(state, action) => {
            // main img
            if(action.payload.key === 'main_img'){
                state.img_regist_target[action.payload.key] = null
            }
            // sub img
            else{

            }
        },
        // initialize state
        initialized_img_regist_target:(state, action) => {
            state.img_regist_target = {
                main_img : null,
                sub_img : null
            }
        }
    }
})

// export action
export const{set_img_regist_target, delete_img_regist_target, initialized_img_regist_target} = img_regist_slice.actions


export default img_regist_slice.reducer
