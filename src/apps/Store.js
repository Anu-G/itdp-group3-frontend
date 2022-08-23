import { createStore } from "redux";
import rootReducer from "./RootReducer";
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
   key: 'root',
   storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer());

export default () => {
   let store = createStore(persistedReducer)
   let persistor = persistStore(store)
   return { store, persistor }
}