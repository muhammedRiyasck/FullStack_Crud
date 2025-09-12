
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import adminReducer from './adminSlice'


const appData = configureStore({
    reducer:{
        userReducer,
        adminReducer
    }
})

export default appData
