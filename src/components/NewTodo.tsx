import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { RootState } from "../redux/store";
import { TodoStatus } from "../types/TodoType";
import { createTodo } from "../redux/slice/todoSlice";

const NewTodo = () => {
  const dispatch = useDispatch();
  const todoData = useSelector((state: RootState) => state.todo.data);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    dispatch(
      createTodo({
        id: todoData.length + 1,
        title: title,
        description: description,
        status: TodoStatus.NOT_DONE,
        createdAt: dayjs().format("YYYY-MM-DD HH:mm"),
      })
    );

    setTitle("");
    setDescription("");
  };

  return (
    <form className="NewTodoForm" onSubmit={handleSubmit}>
      <h1 className="NewTodoTitle">Create Todo</h1>
      <div>
        <label className="NewTodoLabel">Title</label>
        <input
          type="text"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          required
        />
      </div>

      <div>
        <label className="NewTodoLabel">Description</label>
        <textarea
          cols={30}
          rows={5}
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          required
        ></textarea>
      </div>

      <button className="NewTodoButton" type="submit">
        Create
      </button>
    </form>
  );
};

export default NewTodo;
