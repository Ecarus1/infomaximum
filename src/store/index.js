import { configureStore } from "@reduxjs/toolkit";

import registr from "../components/registrLayout/RegistrSlice";
import login from "../components/loginLayout/LoginSlice";
import sidebar from "../components/sidebar/SidebarSlice";
import process from "../components/processList/ProcessSlice"

const store = configureStore({
    reducer: {
        registr,
        login,
        sidebar,
        process
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;