import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Task } from '../types';
import api from '../services/api';

interface TaskState {
  items: Task[];
  selectedTask: Task | null;
  stats: {
    pending: number;
    inProgress: number;
    completed: number;
  };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: TaskState = {
  items: [],
  selectedTask: null,
  stats: {
    pending: 0,
    inProgress: 0,
    completed: 0,
  },
  status: 'idle',
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await api.get('/api/tasks');
  return response.data;
});

export const fetchTaskById = createAsyncThunk('tasks/fetchTaskById', async (id: number) => {
  const response = await api.get(`/api/tasks/${id}`);
  return response.data;
});

export const createTask = createAsyncThunk('tasks/createTask', async (taskData: any) => {
  const response = await api.post('/api/tasks', taskData);
  return response.data;
});

export const updateTaskStatus = createAsyncThunk(
  'tasks/updateTaskStatus',
  async ({ id, status }: { id: number; status: string }) => {
    const response = await api.patch(`/api/tasks/${id}`, { status });
    return response.data;
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchTasks
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.items = action.payload;
        // Calculate task stats
        state.stats.pending = state.items.filter((task) => task.status === 'Pending').length;
        state.stats.inProgress = state.items.filter((task) => task.status === 'In Progress').length;
        state.stats.completed = state.items.filter((task) => task.status === 'Completed').length;
        state.status = 'succeeded';
      })
      // Handle fetchTaskById
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        state.selectedTask = action.payload;
        state.status = 'succeeded';
      })
      // Handle createTask
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = 'succeeded';
      })
      // Handle updateTaskStatus
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.status = 'succeeded';
      });
  },
});

export default taskSlice.reducer;
