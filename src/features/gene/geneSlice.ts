import { createSlice } from "@reduxjs/toolkit";
import type { Gene } from "../../helpers/schema";

const initialState = {
    gene: "" as Gene
}

const geneSlice = createSlice({
    name: "gene",
    initialState,
    reducers: {
        setGene(state, action) {
            state.gene = action.payload;
        }
    }
})

export default geneSlice.reducer;
export const {setGene} = geneSlice.actions;