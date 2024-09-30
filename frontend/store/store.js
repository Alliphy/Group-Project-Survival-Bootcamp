// CONFIG REDUX IF NEEDED //

import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./globalReducer.js";

export default configureStore({
    reducer: {
        globalState: globalReducer
    }
})