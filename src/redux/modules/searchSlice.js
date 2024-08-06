import { createSlice } from "@reduxjs/toolkit";

// 검색어 스테이트
const search_slice = createSlice({
    name:'search',
    initialState:{
        search_data:null
    },
    reducers:{
        set_search_data: (state, action) => {
            state.search_data =  action.payload ? action.payload : null
        }
    }
})

// export action
export const{set_search_data} = search_slice.actions

export default search_slice.reducer