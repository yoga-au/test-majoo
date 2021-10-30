import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import TodoType, { TodoItem } from "../../types/TodoType";

const initialState: TodoType = [];

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    initialTodo: (state, action: PayloadAction<TodoType>) => {
      state = action.payload;
    },
    createTodo: (state, action: PayloadAction<TodoItem>) => {
      state.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state = state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { initialTodo, createTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
