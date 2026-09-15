import { createSlice } from "@reduxjs/toolkit";
import type { Gene } from "../../helpers/schema";

const initialState = {
    geneResult: "" as Gene
}

const geneSlice = createSlice({
    name: "gene",
    initialState,
    reducers: {
        setGene(state, action) {
            state.geneResult = action.payload;
        }
    }
})

export default geneSlice.reducer;
export const {setGene} = geneSlice.actions;