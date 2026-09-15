import { createSlice } from "@reduxjs/toolkit";
import { type searchTerm, type Qtl } from "../../helpers/schema";

const initialState = {
    qtlResults: null as Qtl[] | null,
    searchTerm: null as searchTerm | null 
}

const qtlSlice = createSlice({
    name: "qtl",
    initialState,
    reducers: {
        setQtl(state, action) {
            state.qtlResults = action.payload;
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
        }
    }
})

export default qtlSlice.reducer;
export const {setQtl, setSearchTerm} = qtlSlice.actions;