import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import ModalEditDeleteTodo from "./ModalEditDeleteTodo";

const TodoList = () => {
  // const todoData = useSelector((state: RootState) => state.todo.data);
  const todoDone = useSelector((state: RootState) => state.todo.done);
  const todoNotDone = useSelector((state: RootState) => state.todo.notDone);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(0);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="ListContainer">
        <div style={{ marginRight: "2em" }}>
          <h3 className="ListTitle">Not Done</h3>
          {todoNotDone.map((item) => {
            return (
              <div
                key={item.id}
                className="ListItem"
                onClick={() => {
                  setEditId(item.id);
                  openModal();
                }}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>{item.createdAt}</p>
                <br />
                <strong>{item.status ? "Done" : "Not Done"}</strong>
              </div>
            );
          })}
        </div>
        <div>
          <h3 className="ListTitle">Done</h3>
          {todoDone.map((item) => {
            return (
              <div
                key={item.id}
                className="ListItem"
                onClick={() => {
                  setEditId(item.id);
                  openModal();
                }}
              >
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <p>{item.createdAt}</p>
                <br />
                <strong>{item.status ? "Done" : "Not Done"}</strong>
              </div>
            );
          })}
        </div>
      </div>
      <ModalEditDeleteTodo
        isOpen={showModal}
        closeModal={closeModal}
        todoId={editId}
      />
    </>
  );
};

export default TodoList;
