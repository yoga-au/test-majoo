import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchTodo } from "./redux/slice/todoSlice";

import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="AppContainer">
      <h1>Test Majoo</h1>
      <TodoList />
      <NewTodo />
    </div>
  );
}

export default App;
