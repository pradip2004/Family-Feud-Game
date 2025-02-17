import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../utils/socket";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [revealedOptions, setRevealedOptions] = useState({});
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("adminAuthenticated") === "true"
  );
  const navigate = useNavigate();

  // Handle password submission
  const handlePasswordSubmit = () => {
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuthenticated", "true");
    } else {
      alert("Incorrect password!");
      navigate("/auth/login");
    }
  };

  // Fetch questions from backend
  useEffect(() => {
    if (isAuthenticated) {
      axios.get("http://localhost:5000/api/questions", {
        headers: { Authorization: localStorage.getItem("token") },
      })
        .then((res) => setQuestions(res.data))
        .catch((err) => console.error("Error fetching questions:", err));
    }
  }, [isAuthenticated]);

  // Select a question and send to Live Page
  const handleHighlightQuestion = (question) => {
    setSelectedQuestion(question);
    socket.emit("send_question", question);
  };

  // Reveal option when admin clicks
  const handleOptionClick = (questionIndex, optionIndex) => {
    const option = questions[questionIndex].options[optionIndex];

    setRevealedOptions((prev) => ({
      ...prev,
      [questionIndex]: { ...prev[questionIndex], [optionIndex]: true },
    }));

    socket.emit("reveal_option", { question: selectedQuestion, option });
  };

  return (
    <div className="w-full h-screen bg-pink-900 flex flex-col items-center p-4 relative">
      {!isAuthenticated ? (
        // Password Prompt Popup
        <div className="absolute w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-lg font-bold mb-4">Enter Admin Password</h2>
            <input
              type="password"
              className="border p-2 rounded w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
              onClick={handlePasswordSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="header w-full h-[10%] bg-pink-700 flex items-center justify-between px-3 rounded-lg shadow-md">
            <h1 className="text-white text-xl font-bold">Family Feud - Admin</h1>
            <button
              className="bg-yellow-500 px-4 py-2 rounded-full text-white font-semibold shadow-lg"
              onClick={() => {
                localStorage.removeItem("adminAuthenticated");
                setIsAuthenticated(false);
              }}
            >
              Log Out
            </button>
          </div>

          <div className="w-full lg:w-3/4 h-[90%] flex flex-col items-center p-4 space-y-4">
            <h1 className="text-white text-lg font-bold">Questions</h1>

            <div className="questionBox w-full grid lg:grid-cols-2 gap-4 bg-amber-500 rounded-lg p-3 overflow-y-auto">
              {questions.map((q, qIndex) => (
                <div
                  key={qIndex}
                  className={`p-4 rounded-lg shadow-lg transition-all duration-300 ${
                    selectedQuestion?.question === q.question ? "bg-yellow-300" : "bg-white"
                  }`}
                >
                  <h2 className="font-bold text-lg text-gray-800">{q.question}</h2>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 mt-2 rounded shadow-md"
                    onClick={() => handleHighlightQuestion(q)}
                  >
                    Send to Live
                  </button>

                  <div className="grid grid-cols-1 gap-2 mt-3">
                    {q.options.map((option, oIndex) => (
                      <label
                        key={oIndex}
                        className={`flex items-center space-x-3 p-2 rounded-lg shadow-sm cursor-pointer ${
                          revealedOptions[qIndex]?.[oIndex] ? "bg-green-300" : "bg-gray-100"
                        }`}
                        onClick={() => handleOptionClick(qIndex, oIndex)}
                      >
                        <span className="text-gray-800">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="absolute px-3 py-5 bg-pink-700 shadow-2xl rounded-full bottom-5 right-5 text-white font-semibold cursor-pointer"
            onClick={() => socket.emit("play_sound")}
          >
            Music
          </div>
        </>
      )}
    </div>
  );
}

export default AdminPage;

