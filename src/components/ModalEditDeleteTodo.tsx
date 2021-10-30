import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateTodo } from "../redux/slice/todoSlice";
import { TodoStatus } from "../types/TodoType";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import { deleteTodo } from "../redux/slice/todoSlice";

interface Props {
  todoId: number;
  isOpen: boolean;
  closeModal(): void;
}

const ModalEditDeleteTodo = ({ todoId, isOpen, closeModal }: Props) => {
  const dispatch = useDispatch();
  const todoData = useSelector((state: RootState) => state.todo.data);

  const findTodoData = todoData.find((item) => item.id === todoId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TodoStatus>(0);

  useEffect(() => {
    if (findTodoData) {
      setTitle(findTodoData.title);
      setDescription(findTodoData.description);
      setStatus(findTodoData.status);
    }
  }, [findTodoData]);

  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (findTodoData) {
      dispatch(
        updateTodo({
          id: todoId,
          title: title,
          description: description,
          status: status,
          createdAt: findTodoData?.createdAt,
        })
      );
      setTitle("");
      setDescription("");
      setStatus(0);
      closeModal();
    }
  };

  return (
    <Dialog
      onDismiss={closeModal}
      isOpen={isOpen}
      aria-label="Edit or Delete Todo List"
    >
      <form className="NewTodoForm" onSubmit={handleSubmit}>
        <h1 className="NewTodoTitle">Detail</h1>
        <div>
          <label className="NewTodoLabel">Title</label>
          <input
            type="text"
            style={{ width: "100%" }}
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

        <div>
          <label className="NewTodoLabel">Status</label>
          <select
            value={status}
            onChange={(ev) => setStatus(parseInt(ev.target.value))}
          >
            <option value={TodoStatus.NOT_DONE}>Not Done</option>
            <option value={TodoStatus.DONE}>Done</option>
          </select>
        </div>

        <div style={{ display: "flex" }}>
          <button className="NewTodoButton" type="submit">
            Edit
          </button>
          <button
            className="NewTodoButton"
            disabled={findTodoData && findTodoData.status === 1 ? true : false}
            onClick={() => {
              if (findTodoData) {
                setTitle("");
                setDescription("");
                dispatch(deleteTodo(findTodoData));
                closeModal();
              }
            }}
          >
            Delete
          </button>
        </div>
      </form>
    </Dialog>
  );
};

export default ModalEditDeleteTodo;
