import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  completedTasks: [],
  loading: false,
  error: null,
  stats: {
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
  },
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    fetchTasksRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTasksSuccess: (state, action) => {
      state.loading = false;
      state.tasks = action.payload;
      state.completedTasks = action.payload.filter(task => task.status === 'completed');
      state.stats = {
        totalTasks: action.payload.length,
        completedTasks: action.payload.filter(task => task.status === 'completed').length,
        pendingTasks: action.payload.filter(task => task.status === 'pending').length,
        inProgressTasks: action.payload.filter(task => task.status === 'in-progress').length,
      };
    },
    fetchTasksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createTaskSuccess: (state, action) => {
      state.loading = false;
      state.tasks.push(action.payload);
      state.stats.totalTasks += 1;
      if (action.payload.status === 'pending') {
        state.stats.pendingTasks += 1;
      } else if (action.payload.status === 'in-progress') {
        state.stats.inProgressTasks += 1;
      }
    },
    createTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateTaskSuccess: (state, action) => {
      state.loading = false;
      const index = state.tasks.findIndex(task => task._id === action.payload._id);
      if (index !== -1) {
        const oldStatus = state.tasks[index].status;
        const newStatus = action.payload.status;
        
        // Update stats based on status change
        if (oldStatus === 'pending' && newStatus !== 'pending') {
          state.stats.pendingTasks -= 1;
        }
        if (oldStatus === 'in-progress' && newStatus !== 'in-progress') {
          state.stats.inProgressTasks -= 1;
        }
        if (oldStatus !== 'completed' && newStatus === 'completed') {
          state.stats.completedTasks += 1;
        }
        if (oldStatus === 'completed' && newStatus !== 'completed') {
          state.stats.completedTasks -= 1;
        }
        
        if (newStatus === 'pending') {
          state.stats.pendingTasks += 1;
        } else if (newStatus === 'in-progress') {
          state.stats.inProgressTasks += 1;
        }
        
        state.tasks[index] = action.payload;
      }
    },
    updateTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteTaskRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteTaskSuccess: (state, action) => {
      state.loading = false;
      const deletedTask = state.tasks.find(task => task._id === action.payload);
      if (deletedTask) {
        state.stats.totalTasks -= 1;
        if (deletedTask.status === 'completed') {
          state.stats.completedTasks -= 1;
        } else if (deletedTask.status === 'pending') {
          state.stats.pendingTasks -= 1;
        } else if (deletedTask.status === 'in-progress') {
          state.stats.inProgressTasks -= 1;
        }
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      }
    },
    deleteTaskFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  createTaskRequest,
  createTaskSuccess,
  createTaskFailure,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskFailure,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
  clearError,
} = taskSlice.actions;

export default taskSlice.reducer;