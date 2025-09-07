import { useState, useRef, useEffect } from "react";
import "./MiniGame.css";

export default function Mini() {
  const [haytnvel, setHaytnvel] = useState("");              // "Жди..."
  const [xaxal, setXaxal] = useState("");                    // "Жми"
  const [showStart, setShowStart] = useState(true);          // Кнопка "начать игру"
  const [reactionMessage, setReactionMessage] = useState(""); // Сообщение о реакции
  const [reactionHistory, setReactionHistory] = useState([]); // Последние 5 реакций
  const [bestReaction, setBestReaction] = useState(null);     // Лучший результат

  const xax = useRef(false);
  const spasel = useRef(false);
  const startTime = useRef(0);

  const toggleGame = () => {
    spasel.current = true;
    setShowStart(false);
    setHaytnvel("a");
    setXaxal("");
    setReactionMessage("");

    const rand = (Math.floor(Math.random() * (5 - 2 + 1)) + 2) * 1000;

    setTimeout(() => {
      setHaytnvel("");
      game();
    }, rand);
  };

  const game = () => {
    xax.current = true;
    startTime.current = performance.now();
    setXaxal("a");
  };

  const handleClick = () => {
    const endTime = performance.now();
    const reaction = Math.round(endTime - startTime.current);

    let message = "";
    if (reaction > 1000) {
      message = `Ты опоздал! Реакция: ${reaction} мс`;
    } else {
      message = `Твоя реакция: ${reaction} мс`;
    }

    setReactionMessage(message);

    // Обновить историю
    const newHistory = [reaction, ...reactionHistory].slice(0, 5);
    setReactionHistory(newHistory);
    localStorage.setItem("reactionHistory", JSON.stringify(newHistory));

    // Обновить лучший результат (только если он быстрее текущего)
    if (reaction <= 1000 && (bestReaction === null || reaction < bestReaction)) {
      setBestReaction(reaction);
      localStorage.setItem("bestReaction", reaction.toString());
    }

    xax.current = false;
    setXaxal("");
    setShowStart(true);
  };

  // Загрузка истории и лучшего результата при старте
  useEffect(() => {
    const savedHistory = localStorage.getItem("reactionHistory");
    if (savedHistory) {
      setReactionHistory(JSON.parse(savedHistory));
    }

    const savedBest = localStorage.getItem("bestReaction");
    if (savedBest) {
      setBestReaction(parseInt(savedBest, 10));
    }
  }, []);

  const containerClass = `A ${xaxal ? "bg-change" : ""}`;

  return (
    <div className={containerClass}>
      {/* Самый лучший результат */}
      {bestReaction !== null && (
        <p className="best-result">Лучший результат: {bestReaction} мс</p>
      )}

      {showStart && (
        <button onClick={toggleGame} className="gameStartButton">
          Начать игру
        </button>
      )}

      {haytnvel && <p className={`${haytnvel} click`}>Жди...</p>}

      {xaxal && (
        <button onClick={handleClick} className={xaxal}>
          Жми
        </button>
      )}

      {reactionMessage && (
        <p className="reaction-text">{reactionMessage}</p>
      )}

      {reactionHistory.length > 0 && (
        <div className="history">
          <h3>Последние 5 реакций:</h3>
          <ul>
            {reactionHistory.map((r, index) => (
              <li key={index}>{r} мс</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
