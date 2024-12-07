import React from "react";

const QuizScreen = ({ question, onSubmit }) => {
  if (!question) return <div className="text-center">Waiting for question...</div>;

  const handleAnswer = (answer) => {
    onSubmit(answer);
  };

  const [q, ...options] = question.split("\n");
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold">{q}</h2>
      <div className="mt-4">
        {options.map((opt, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(opt.split(".")[0].trim())}
            className="block bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuizScreen;
