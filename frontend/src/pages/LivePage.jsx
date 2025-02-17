import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import socket from "../utils/socket";
import rightSound from "../assets/rightSound.mp3";
import wrongSound from "../assets/wrong.mp3"

function LivePage() {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [revealedOptions, setRevealedOptions] = useState([]);
  const [isVisible, setIsVisible] = useState(false); // Track image visibility
  const colors = ["bg-red-400", "bg-blue-400", "bg-green-400"];

  useEffect(() => {
    // Receive question from Admin
    socket.on("receive_question", (question) => {
      setCurrentQuestion(question);
      setRevealedOptions([]);
    });

    // Receive revealed option
    socket.on("show_option", ({ option }) => {
      setRevealedOptions((prev) => {
        if (!prev.includes(option)) {
          playSound(); 
          triggerAnimation(); // Trigger image animation when an option is revealed
        }
        return [...prev, option];
      });
    });

    socket.on("trigger_sound", () => {
      wrongMusic();
    });

    return () => {
      socket.off("receive_question");
      socket.off("show_option");
      socket.off("trigger_sound");
    };
  }, []);

  const wrongMusic = ()=>{
    const audio1 = new Audio(wrongSound);
    audio1.play();
  }

  const playSound = () => {
    const audio = new Audio(rightSound);
    audio.play();
  };

  const triggerAnimation = () => {
    setIsVisible(true); // Show image
    gsap.to(
      ".right-image",
      {
        right: "0%", // Move to right
        duration: 0.5,
        ease: "power2.out",
        onComplete: () => {
          setTimeout(() => {
            gsap.to(".right-image", {
              right: "-20%", // Move back after 2s
              duration: 0.5,
              ease: "power2.in",
              onComplete: () => setIsVisible(false), // Hide after animation
            });
          }, 2000);
        },
      }
    );
  };

  return (
    <div className="w-full h-screen bg-amber-100 flex items-center justify-center relative overflow-hidden">
      <img src="/Logo.png" alt="" className="w-96 absolute top-[-10%] z-10" />
      <div className="bg-[#E6F9AF] absolute top-44 text-xl font-bold px-5 py-3 border-4 border-black rounded-full z-20">Question</div>
      <div className="w-[80%] h-[60%] bg-white border-black border-4 rounded-[3rem] flex flex-col items-center justify-center p-8 mt-32">
        {currentQuestion ? (
          <>
            <h1 className="text-4xl font-bold text-center mb-10 px-4">{currentQuestion.question}</h1>
            <div className="grid grid-cols-2 gap-6 w-full px-16">
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 cursor-pointer flex items-center justify-center text-xl font-bold text-white w-full py-6 rounded-lg ${colors[index % colors.length]} ${
                    revealedOptions.includes(option) ? "opacity-100 scale-100" : "opacity-50 scale-90"
                  }`}
                >
                  <span>{index + 1}. {revealedOptions.includes(option) && option}</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <h2 className="text-2xl text-gray-600">Waiting for a question...</h2>
        )}
      </div>

      {/* Animated Image */}
      {isVisible && (
        <img src="/right.png" alt="" className="absolute w-72 right-image right-0 top-14" />
      )}

      <img src="/Ishan.png" alt="" className="absolute w-72 bottom-0"/>
      <img src="/grpA.png" alt="" className="absolute w-96 bottom-0 left-0" />
      <img src="/grpB.png" alt="" className="absolute w-96 bottom-0 right-0" />
    </div>
  );
}

export default LivePage;
