import { combineReducers, configureStore } from '@reduxjs/toolkit'
import autocompleteReducer from "../features/autocomplete/autocompleteSlice.ts";
import geneReducer from "../features/gene/geneSlice.ts";
import variantReducer from "../features/variant/variantSlice.ts";
import qtlReducer from "../features/qtl/qtlSlice.ts";
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import type { PersistConfig } from 'redux-persist';

const rootReducer = combineReducers({
    autocompleteReducer, geneReducer, 
    variantReducer, qtlReducer})

export type RootState = ReturnType<typeof rootReducer>

const persistConfig: PersistConfig<RootState> = {
    key: "root",
    storage: storageSession,
    debug: true,
    stateReconciler: hardSet
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
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

export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store.dispatch;