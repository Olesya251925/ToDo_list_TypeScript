import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

interface TaskState {
    tasks: Task[];
    isShareModalOpen: boolean;
    sharedTask: Task | null;
    isDeleteModalOpen: boolean;
    taskToDelete: Task | null;
    errorMessage: string;
}

const loadTasksFromLocalStorage = (): Task[] => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    return tasks;
};

const initialState: TaskState = {
    tasks: loadTasksFromLocalStorage(),
    isShareModalOpen: false,
    sharedTask: null,
    isDeleteModalOpen: false,
    taskToDelete: null,
    errorMessage: '',
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        editTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
                localStorage.setItem('tasks', JSON.stringify(state.tasks));
            }
        },
        loadTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        reorderTasks: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
            const [movedTask] = state.tasks.splice(action.payload.sourceIndex, 1);
            state.tasks.splice(action.payload.destinationIndex, 0, movedTask);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
        openShareModal: (state, action: PayloadAction<Task>) => {
            state.isShareModalOpen = true;
            state.sharedTask = action.payload;
        },
        closeShareModal: (state) => {
            state.isShareModalOpen = false;
            state.sharedTask = null;
        },
        openDeleteModal: (state, action: PayloadAction<Task>) => {
            state.isDeleteModalOpen = true;
            state.taskToDelete = action.payload;
        },
        closeDeleteModal: (state) => {
            state.isDeleteModalOpen = false;
            state.taskToDelete = null;
        },
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        },
    },
});

export const {
    addTask,
    deleteTask,
    editTask,
    loadTasks,
    reorderTasks,
    openShareModal,
    closeShareModal,
    openDeleteModal,
    closeDeleteModal,
    setErrorMessage,
} = taskSlice.actions;

export default taskSlice.reducer;
