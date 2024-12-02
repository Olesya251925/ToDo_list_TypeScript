import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/taskSlice";

export interface RootState {
  tasks: {
    isShareModalOpen: boolean;
    isDeleteModalOpen: boolean;
  };
}

export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
