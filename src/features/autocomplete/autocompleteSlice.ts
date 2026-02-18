import { createSlice } from "@reduxjs/toolkit";
import type { AutocompleteResult } from "../../helpers/schema";

const initialState = {
    autocompleteResult: null as AutocompleteResult | null
};

const autocompleteSlice = createSlice({
    name: "autocomplete",
    initialState,
    reducers: {
        setAutocomplete(state, action) {
            state.autocompleteResult = action.payload;
        }
    }
})

export default autocompleteSlice.reducer;
export const {setAutocomplete} = autocompleteSlice.actions;