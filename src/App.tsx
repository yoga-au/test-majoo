import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTodo } from "./redux/slice/todoSlice";

import TodoList from "./components/TodoList";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1>Test Majoo</h1>
      <TodoList />
    </>
  );
}

export default App;
