import { createSlice } from "@reduxjs/toolkit";
import type { AutoCompleteResult } from "../../helpers/schema";

const initialState = {
    autocomplete: [] as AutoCompleteResult[]
};

const autoCompleteSlice = createSlice({
    name: "autoComplete",
    initialState,
    reducers: {
        setAutoComplete(state, action) {
            state.autocomplete = action.payload;
        }
    }
})

export default autoCompleteSlice.reducer;
export const {setAutoComplete} = autoCompleteSlice.actions;