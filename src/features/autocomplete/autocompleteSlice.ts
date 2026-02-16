import { createSlice } from "@reduxjs/toolkit";
import type { AutoCompleteResult } from "../../helpers/schema";

const initialState = {
    autocomplete: [{
        value: "",
        name: "",
        type: "",
        id: "",
        __typename: "",
        aliases: [],
        ensg_id: ""
    }] as AutoCompleteResult[]
};

const autoCompleteSlice = createSlice({
    name: "autocomplete",
    initialState,
    reducers: {
        setAutoComplete(state, action) {
            state.autocomplete = action.payload;
        }
    }
})

export default autoCompleteSlice.reducer;
export const {setAutoComplete} = autoCompleteSlice.actions;