import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import overay_reducer from "../modules/overaySlice";
import search_reducer from "../modules/searchSlice";


const store = configureStore({
    reducer:{
        // 오버레이 state
        overay : overay_reducer,

        // 검색어 state
        search : search_reducer,

    }
})

export {store, Provider}