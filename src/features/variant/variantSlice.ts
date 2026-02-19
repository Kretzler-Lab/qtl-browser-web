import { createSlice } from "@reduxjs/toolkit";
import type { QtlId } from "../../helpers/schema";

const initialState = {
    variant: {} as QtlId
}

const variantSlice = createSlice({
    name: "variant",
    initialState,
    reducers: {
        setVariant(state, action) {
            state.variant = action.payload;
        }
    }
})

export default variantSlice.reducer;
export const {setVariant} = variantSlice.actions;