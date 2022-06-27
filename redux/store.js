import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import photosReducer from "./reducers";

const persistConfig = {
	key: "root",
	storage: AsyncStorage,
	whitelist: ["favorites", "query"],
};
const rootReducer = combineReducers({
	photos: persistReducer(persistConfig, photosReducer),
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
