import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import itemReducer from './slices/itemSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}


const rootReducer = combineReducers({
  auth: authReducer,
  item: itemReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  // reducer: rootReducer,
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export let persistor = persistStore(store);