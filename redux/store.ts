import { configureStore, Action } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";
import rootReducer, { RootState } from "./rootReducer";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig ={
    key:"root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer:persistedReducer,
})

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept('./rootReducer', () => {
        const newRootReducer = require('./rootReducer').default
        store.replaceReducer(newRootReducer);
    });
}

//extacting Dispatch type from the store
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState,null, Action<string>>
export const persistor = persistStore(store);
export default store;

