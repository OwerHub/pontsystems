import { configureStore } from "@reduxjs/toolkit";
import citizenDataReducer from "./citizenDataSlice";

const store = configureStore({
    reducer: {
        citizenData: citizenDataReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
