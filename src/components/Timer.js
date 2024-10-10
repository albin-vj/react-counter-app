import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setSecondsElapsed(0);
  };

  useEffect(() => {
    let timer;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setSecondsElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="timer-container">
      <p className="timer-display">{formatTime(secondsElapsed)}</p>
      <button
        className={`timer-button ${isTimerRunning ? 'stop' : 'start'}`}
        onClick={isTimerRunning ? stopTimer : startTimer}
      >
        {isTimerRunning ? 'Stop Timer' : 'Start Timer'}
      </button>
      <button className="reset-button" onClick={resetTimer}>
        Reset Timer
      </button>
    </div>
  );
};

export default Timer;
