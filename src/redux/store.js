import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage  from "redux-persist/lib/storage";
import { contactsReduser } from "./contactsSlice";
import { filterReducer } from "./filterSlice";
import { persistStore, persistReducer } from "redux-persist";


const persistConfig = {
  key:  'root',
  storage,
};

const persistedReducer = persistReducer(
persistConfig,
combineReducers({
  contacts: contactsReduser,
  filter: filterReducer,
}),
);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => 
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
