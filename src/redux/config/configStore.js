import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// reducer
import overay_reducer from "../modules/overaySlice";
import search_reducer from "../modules/searchSlice";
import map_reducer from "../modules/mapSlice"
import listhover_reducer from "../modules/listhoverSlice";
import modaldata_reducer from "../modules/modaldataSlice";
import search_modal_reducer from "../modules/searchModalSlice";

const store = configureStore({
    reducer:{
        // 오버레이 state
        overay : overay_reducer,

        // 검색어 state
        search : search_reducer,

        // 지도 카드 state
        map : map_reducer,

        // sub app - modal - list 호버 state
        listhover : listhover_reducer,

        // modal data state
        modaldata : modaldata_reducer,

        // search modal state
        search_modal : search_modal_reducer
    }
})

export {store, Provider}