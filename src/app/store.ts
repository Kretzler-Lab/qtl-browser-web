import { configureStore } from '@reduxjs/toolkit'
import autocompleteReducer from "../features/autocomplete/autocompleteSlice.ts";
import geneReducer from "../features/gene/geneSlice.ts";
export const store = configureStore({
    reducer: {
        autocomplete: autocompleteReducer,
        gene: geneReducer
    },
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store.dispatch;