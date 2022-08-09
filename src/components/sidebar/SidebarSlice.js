import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebar: true
}

const sidebarPanelSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        hiddenSidebar: (state) => {
            state.sidebar = !state.sidebar;
            
            return state;
        }
    }
})

const {actions, reducer} = sidebarPanelSlice;

export default reducer;

export const {hiddenSidebar} = actions;

export const sidebarSelector = (state) => state.sidebar;