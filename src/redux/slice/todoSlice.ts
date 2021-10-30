import { createSlice, PayloadAction, Dispatch } from "@reduxjs/toolkit";
import TodoType, { TodoItem, TodoStatus } from "../../types/TodoType";
import axios, { AxiosResponse } from "axios";
import orderBy from "lodash.orderby";

let initialState: TodoType = {
  data: [],
  done: [],
  notDone: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    initialTodo: (state, action: PayloadAction<TodoItem[]>) => {
      state.data = action.payload;
      const notDone = action.payload.filter(
        (item) => item.status === TodoStatus.NOT_DONE
      );
      const done = action.payload.filter(
        (item) => item.status === TodoStatus.DONE
      );
      state.notDone = orderBy(notDone, ["createdAt"], ["asc"]);
      state.done = orderBy(done, ["createdAt"], ["desc"]);
    },
    createTodo: (state, action: PayloadAction<TodoItem>) => {
      state.data.push(action.payload);
      state.notDone.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<TodoItem>) => {
      const editIndex = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      state.data[editIndex] = action.payload;

      const notDone = state.data.filter(
        (item) => item.status === TodoStatus.NOT_DONE
      );
      const done = state.data.filter((item) => item.status === TodoStatus.DONE);
      state.notDone = orderBy(notDone, ["createdAt"], ["asc"]);
      state.done = orderBy(done, ["createdAt"], ["desc"]);
    },
    deleteTodo: (state, action: PayloadAction<TodoItem>) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id);

      if (action.payload.status === TodoStatus.DONE) {
        state.done = state.done.filter((item) => item.id !== action.payload.id);
      }

      if (action.payload.status === TodoStatus.NOT_DONE) {
        state.notDone = state.notDone.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
  },
});

export const { initialTodo, createTodo, updateTodo, deleteTodo } =
  todoSlice.actions;
export default todoSlice.reducer;

// async thunk
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
