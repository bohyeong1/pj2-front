import { createSlice } from "@reduxjs/toolkit";
import { addDays } from 'date-fns';

// 검색어 모달 스테이트
const search_modal_slice = createSlice({
    name:'search_modal',
    initialState:{
        search_modal_state : false,
        search_data_name : null,
        location_data : null,
        checkin_data : new Date().toISOString(),
        checkout_data : addDays(new Date(), 1).toISOString(),
        capacity_data : 1
    },
    reducers:{
        // modal open
        open_search_modal : (state, action) => {
            state.search_modal_state =  true
            state.search_data_name = action.payload.search_data_name
        },

        // modal close
        close_search_modal : (state, action) => {
            state.search_modal_state = false
            state.search_data_name = null
        },

        // initialized search data name
        initialized_search_data : (state, action) => {
            state.search_data_name = null
        },

        // set locaiton data
        set_location_data : (state, action) => {
            state.location_data = action.payload.location_data
        },

        // delete location data
        delete_location_data : (state, action) => {
            state.location_data = null
        },

        // set checkin data
        set_checkin_data : (state, action) => {
            state.checkin_data = action.payload.checkin_data
        },

        // delete checkin data
        delete_checkin_data : (state, action) => {
            state.checkin_data = null
        },

        // set checkout data
        set_checkout_data : (state, action) => {
            state.checkout_data = action.payload.checkout_data
        },

        // delete checkout data
        delete_checkout_data : (state, action) => {
            state.checkout_data = null
        },

        // set capacity data
        set_capacity_data : (state, action) => {
            state.capacity_data = action.payload.capacity_data
        },

        // delete capacity data
        delete_capacity_data : (state, action) => {
            state.capacity_data = null
        }
    }
})

// export action
export const{open_search_modal, 
            close_search_modal, 
            initialized_search_data,
            set_location_data,
            delete_location_data,
            set_checkin_data,
            delete_checkin_data,
            set_checkout_data,
            delete_checkout_data,
            set_capacity_data,
            delete_capacity_data} = search_modal_slice.actions

export default search_modal_slice.reducer