import { createAsyncThunk } from '@reduxjs/toolkit';
import { taskAPI } from '../../utils/api';
import {
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
} from '../reducers/taskReducers';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { dispatch }) => {
    try {
      dispatch(fetchTasksRequest());
      const response = await taskAPI.getAllTasks();
      dispatch(fetchTasksSuccess(response.data));
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to fetch tasks';
      dispatch(fetchTasksFailure(message));
      throw new Error(message);
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { dispatch }) => {
    try {
      dispatch(createTaskRequest());
      const response = await taskAPI.createTask(taskData);
      dispatch(createTaskSuccess(response.data));
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create task';
      dispatch(createTaskFailure(message));
      throw new Error(message);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, taskData }, { dispatch }) => {
    try {
      dispatch(updateTaskRequest());
      const response = await taskAPI.updateTask(id, taskData);
      dispatch(updateTaskSuccess(response.data));
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to update task';
      dispatch(updateTaskFailure(message));
      throw new Error(message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { dispatch }) => {
    try {
      dispatch(deleteTaskRequest());
      await taskAPI.deleteTask(id);
      dispatch(deleteTaskSuccess(id));
      return id;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to delete task';
      dispatch(deleteTaskFailure(message));
      throw new Error(message);
    }
  }
);