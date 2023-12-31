import React, { useState, useEffect } from "react";
import "./App.css";
import Audio1 from "./File/Audio1.mp3";
import Audio2 from "./File/Audio2.mp3";

const App = () => {
  const [fireworks, setFireworks] = useState(false);
  const [name, setName] = useState("");
  const [showWish, setShowWish] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ms, setMs] = useState(false);
  const [audio1, setAudio1] = useState(new Audio(Audio1));
  const [audio2, setAudio2] = useState(new Audio(Audio2));
  const [showCountdown, setShowCountdown] = useState(true);
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setFireworks(true);

    const targetDate = new Date("January 1, 2024 00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const timeDifference = targetDate - now;

      if (timeDifference > 0) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        setCountdown({ days, hours, minutes, seconds });
      } else {
        // If the target date is reached, switch to the clock
        setShowCountdown(false);
      }
    };

    updateCountdown(); // Initial call to set the initial countdown

    const countdownInterval = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(countdownInterval);
      setFireworks(false);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() !== "") {
      const newName = name.toUpperCase();
      setName(newName);
      setShowWish(true);
      setSubmitted(true);

      // Pause Audio1 and play Audio2
      playMusic(audio1, false);
      playMusic(audio2, true);
    }
  };

  const playMusic = (audio, play) => {
    if (play) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const StartFirstAudio = () => {
    if (ms) return;
    setMs(true);
    playMusic(audio1, true);
  };

  return (
    <div className={`container ${submitted ? "submitted" : ""}`}>
      {showCountdown ? (
        <div className="countdown">
          <h2>{`${countdown.days}d ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`}</h2>
        </div>
      ) : (
        <div className="clock">
          <h2>{new Date().toLocaleDateString()}</h2>
        </div>
      )}
      {showWish ? (
        <>
          <h1>Happy New Year! 🎆2024 🎆💥</h1>
          <h1>{name}</h1>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <h1>Enter your name</h1>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              StartFirstAudio();
            }}
            className="name-input"
            disabled={submitted}
          />
          <button type="submit" className="submit-button" disabled={submitted}>
            {submitted ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}

      <p
        style={{
          fontSize: "0.8rem",
          position: "fixed",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        sandipan
      </p>
    </div>
  );
};

export default App;
