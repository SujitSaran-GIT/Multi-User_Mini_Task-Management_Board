import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducers';
import taskReducer from './reducers/taskReducers';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});