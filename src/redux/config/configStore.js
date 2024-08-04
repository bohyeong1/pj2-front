import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import overay_reducer from "../modules/overaySlice";

const store = configureStore({
    reducer:{
        // 오버레이 state
        overay_reducer : overay_reducer
    }
})

export {store, Provider}