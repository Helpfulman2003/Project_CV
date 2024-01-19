import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'reduxjs-toolkit-persist';
import storage from 'reduxjs-toolkit-persist/lib/storage'
import autoMergeLevel1 from 'reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1';
import userReducer from "./userSlice.ts";
import shopReducer from "./shopSlice.ts"
import allProductShopReducer from "./allProductShopSlice.ts"
import allProductReducer from './allProductSlice.ts'
import cartReducer from './cartSlice.ts'
import allEventReducer from './allEventSlice.ts'
import allCouponCodeReducer from "./allCouponCodeSlice.ts";
import allOrderReducer from './allOrderSlice.ts'
import allOrderUserReducer from './allOrderUserSlice.ts'

const persistConfig = {
  key: 'root',
  storage: storage,
  stateReconciler: autoMergeLevel1,
};

const reducers = combineReducers<any>({
  user: userReducer,
  shop: shopReducer,
  allProductShop: allProductShopReducer,
  allProduct: allProductReducer,
  cart: cartReducer,
  allEvent: allEventReducer,
  allCouponCode: allCouponCodeReducer,
  allOrder: allOrderReducer,
  allOrderUser: allOrderUserReducer
});

const _persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: _persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      /* ignore persistance actions */
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER
      ],
    },
  }),
});

export const persistor = persistStore(store);
