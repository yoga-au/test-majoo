// import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const TodoList = () => {
  const todoData = useSelector((state: RootState) => state.todo.data);

  return (
    <>
      {todoData.map((item) => {
        return (
          <div key={item.id}>
            <h3>{item.title}</h3>
          </div>
        );
      })}
    </>
  );
};

export default TodoList;
