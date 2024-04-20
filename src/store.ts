
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from "./redux/rootReducer";


const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default store;
