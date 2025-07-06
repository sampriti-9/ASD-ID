// OperationsGame.js
import React, { useState } from 'react';
import './OperationsGame.css';

const generateProblem = () => {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const isAddition = Math.random() > 0.5;
  const correctAnswer = isAddition ? a + b : a - b;
  const options = [
    correctAnswer,
    correctAnswer + 1,
    correctAnswer - 1
  ].sort(() => Math.random() - 0.5);

  return {
    question: `${a} ${isAddition ? '+' : '-'} ${b}`,
    correctAnswer,
    options
  };
};

const OperationsGame = () => {
  const [problem, setProblem] = useState(generateProblem());
  const [feedback, setFeedback] = useState(null);

  const handleAnswer = (value) => {
    if (value === problem.correctAnswer) {
      setFeedback('✅ Correct!');
    } else {
      setFeedback('❌ Try Again!');
    }

    setTimeout(() => {
      setFeedback(null);
      setProblem(generateProblem());
    }, 1000);
  };

  return (
    <div className="operations-game">
      <h3>Solve: {problem.question}</h3>
      <div className="options">
        {problem.options.map((opt, idx) => (
          <button key={idx} onClick={() => handleAnswer(opt)}>
            {opt}
          </button>
        ))}
      </div>
      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
};

export default OperationsGame;
