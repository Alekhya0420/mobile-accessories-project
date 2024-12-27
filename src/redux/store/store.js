// import {configureStore} from "@reduxjs/toolkit";
// import cartSlice from  '../slice/cartSlice'
// import authSlice  from "../slice/authSlice";

// const store=configureStore({
//     reducer:{
//         allCart:cartSlice,
//         allauth:authSlice,
//     }
// })

// export default store


import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slice/cartSlice";
import authSlice from "../slice/authSlice";
import storage from "redux-persist/lib/storage"; // You can use localStorage or sessionStorage
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";  // Import combineReducers


const persistConfig = {
  key: "root",
  storage,  
};

const rootReducer = combineReducers({
  allCart: cartSlice,
  allauth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});


export const persistor = persistStore(store);
export default store;
