import { useEffect, useState } from "react";

export default function Counter() {
  const [cont, setcont] = useState(() => {
    const saved = localStorage.getItem('number')
    return saved ? Number(saved) : 0;
  })
  
  const add = () => {
    setcont(prev => prev + 1)
  }
  
  const minus = () => {
    setcont(prev => prev - 1)
  }

  useEffect(() => {
    localStorage.setItem("number", cont);
  }, [cont]);

  return (
        <div className="A">
          <button onClick={add}>Увелечить</button>
          <p>{cont}</p>
          <button onClick={minus}>Уменьшить</button>
        </div>
  );
}