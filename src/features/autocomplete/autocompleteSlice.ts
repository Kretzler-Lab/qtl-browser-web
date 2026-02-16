import { createSlice } from "@reduxjs/toolkit";
import type { AutoCompleteResult } from "../../helpers/schema";

const initialState = {
    autocompleteResult: [] as AutoCompleteResult[]
};

const autoCompleteSlice = createSlice({
    name: "autocomplete",
    initialState,
    reducers: {
        setAutoComplete(state, action) {
            state.autocompleteResult = action.payload;
        }
    }
})

export default autoCompleteSlice.reducer;
export const {setAutoComplete} = autoCompleteSlice.actions;