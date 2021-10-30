import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
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

  useEffect(() => {
    if (findTodoData) {
      setTitle(findTodoData.title);
      setDescription(findTodoData.description);
    }
  }, [findTodoData]);

  return (
    <Dialog
      onDismiss={closeModal}
      isOpen={isOpen}
      aria-label="Edit or Delete Todo List"
    >
      <form className="NewTodoForm">
        <h1 className="NewTodoTitle">Detail</h1>
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

        <div style={{ display: "flex" }}>
          <button className="NewTodoButton">Edit</button>
          <button
            className="NewTodoButton"
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
