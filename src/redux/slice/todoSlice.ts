import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import TodoType, { TodoItem } from "../../types/TodoType";
import axios, { AxiosResponse } from "axios";

let initialState: TodoType = {
  data: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    initialTodo: (state, action: PayloadAction<TodoItem[]>) => {
      state.data = action.payload;
    },
    createTodo: (state, action: PayloadAction<TodoItem>) => {
      state.data.push(action.payload);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export const { initialTodo, createTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;

export function fetchTodo() {
  return async (dispatch: Dispatch) => {
    try {
      const response: AxiosResponse<TodoItem[]> = await axios.get(
        "https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list"
      );
      const result = response.data;

      dispatch(initialTodo(result));
    } catch (error) {
      throw new Error("fetching failed");
    }
  };
}
