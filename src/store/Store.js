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
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { authApi } from "./services/authApi";

const persistConfig = {
  key: "auth",   // sirf auth slice ke liye persist
  storage,
  whitelist: ["user", "token", "isAuthenticated"], 
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
       [authApi.reducerPath]: authApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(
            authApi.middleware,
        ),
})
export const persistor = persistStore(store);