import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices//authSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import { authApi } from "./services/authApi";
import { categoryApi } from "./services/categoryApi";

const persistConfig = {
  key: "auth",   
  storage,
  whitelist: ["user", "token", "isAuthenticated"], 
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        [authApi.reducerPath]: authApi.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(
            authApi.middleware,
            categoryApi.middleware,
        ),
})

export const persistor = persistStore(store);
