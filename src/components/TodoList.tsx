// import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const TodoList = () => {
  // const todoData = useSelector((state: RootState) => state.todo.data);
  const todoDone = useSelector((state: RootState) => state.todo.done);
  const todoNotDone = useSelector((state: RootState) => state.todo.notDone);

  return (
    <>
      <div className="ListContainer">
        <div style={{ marginRight: "2em" }}>
          <h3 className="ListTitle">Done</h3>
          {todoNotDone.map((item) => {
            return (
              <div key={item.id} className="ListItem">
                <h3>{item.title}</h3>
                <p>{item.createdAt}</p>
              </div>
            );
          })}
        </div>
        <div>
          <h3 className="ListTitle">Not Done</h3>
          {todoDone.map((item) => {
            return (
              <div key={item.id} className="ListItem">
                <h3>{item.title}</h3>
                <p>{item.createdAt}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TodoList;
