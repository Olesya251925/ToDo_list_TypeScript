import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './features/taskSlice';

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
