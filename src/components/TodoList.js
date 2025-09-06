import { useEffect, useState } from "react";

export default function Todo() {
  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState(() => {
    const saved = localStorage.getItem("todo");
    return saved ? JSON.parse(saved) : [];
  });

  const add = () => {
    if (inputValue.trim() === "") return;
    const newTodo = [...todo, inputValue];
    setTodo(newTodo);
    setInputValue("");
  };

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Задача"
      />
      <button onClick={add}>Добавить</button>

      <ul>
        {todo.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

  