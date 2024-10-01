import { configureStore } from "@reduxjs/toolkit";
import citizenDataReducer from "./citizenDataSlice";
import modalDataReducer from "./modalSlice";

const store = configureStore({
    reducer: {
        citizenData: citizenDataReducer,
        modalData: modalDataReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
