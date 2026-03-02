import { combineReducers, configureStore } from '@reduxjs/toolkit'
import autocompleteReducer from "../features/autocomplete/autocompleteSlice.ts";
import geneReducer from "../features/gene/geneSlice.ts";
import variantReducer from "../features/variant/variantSlice.ts";
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'
const persistConfig = {
    key: "root",
    storage: storageSession
}

const rootReducer = combineReducers({autocompleteReducer, geneReducer, variantReducer})
const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//     reducer: {
//         autocomplete: autocompleteReducer,
//         gene: geneReducer,
//         variant: variantReducer
//     },
// });

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck:{
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"]
            }
        }),
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store.dispatch;