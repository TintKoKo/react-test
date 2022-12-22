import React, { createContext, useContext, useReducer, useRef } from "react";

const ToDoContext = createContext(null);

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todo: [...state.todo, action.payload],
      };
    case "REMOVE_TODO":
      return {
        ...state,
        todo: [...state.todo.filter((t) => t.id !== action.payload.id)],
      };
    default:
      throw new Error("action not found");
  }
};

function App() {
  const [state, dispatch] = useReducer(todoReducer, { todo: [] });
  return (
    <ToDoContext.Provider value={{ state, dispatch }}>
      <ToDoList />
      <AddToDo />
    </ToDoContext.Provider>
  );
}

function ToDoList() {
  const {
    state: { todo },
    dispatch,
  } = useContext(ToDoContext);

  const handleRemove = (t) => {
    dispatch({
      type: "REMOVE_TODO",
      payload: t,
    });
  };

  return (
    <div>
      <h1>TODOs</h1>
      <ul>
        {todo.map((t) => (
          <li key={t.id}>
            {t.name}
            <button onClick={() => handleRemove(t)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AddToDo() {
  const {
    state: { todo },
    dispatch,
  } = useContext(ToDoContext);

  let inputRef = useRef(null);

  const handleAdd = () => {
    const id = todo[todo?.length - 1]?.id + 1 || 1;

    dispatch({
      type: "ADD_TODO",
      payload: {
        id: id,
        name: inputRef?.current?.value,
        isDone: false,
      },
    });

    inputRef.current.value = "";
  };

  return (
    <div>
      <input type="text" placeholder="Todo" ref={inputRef} />
      <button onClick={handleAdd}>Add ToDo</button>
    </div>
  );
}

export default App;
