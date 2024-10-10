// src/components/CountdownTimer.js

import React, { useEffect, useState } from 'react';
import '../styles/CountdownTimer.css'; // Import styles from the existing CSS file

const CountdownTimer = ({ targetDate, onDateChange }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [inputDate, setInputDate] = useState(targetDate);
  const [isSubmitted, setIsSubmitted] = useState(false); // State to check if date is submitted

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const target = new Date(inputDate);
      const difference = target - now;

      if (difference > 0) {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      }
    };

    const timer = setInterval(() => {
      if (isSubmitted) { // Calculate time only if the date is submitted
        calculateTimeLeft();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [inputDate, isSubmitted]);

  const handleDateChange = (e) => {
    setInputDate(e.target.value);
    onDateChange(e.target.value); // Call the parent function to update the target date
  };

  const handleSubmit = () => {
    setIsSubmitted(true); // Set the submitted state to true
  };

  return (
    <div className="countdown-timer">
      <h2>Time Left:</h2>
      <input
        type="datetime-local"
        value={inputDate}
        onChange={handleDateChange}
        className="date-input"
      />
      <button className="submit-button" onClick={handleSubmit} disabled={!inputDate}>
        Submit
      </button>
      {isSubmitted && (
        <div className="timer-display">
          {`${timeLeft.hours}:${timeLeft.minutes < 10 ? '0' : ''}${timeLeft.minutes}:${timeLeft.seconds < 10 ? '0' : ''}${timeLeft.seconds}`}
        </div>
      )}
      {!isSubmitted && !inputDate && (
        <p className="placeholder-text">Please select a target date and time.</p>
      )}
    </div>
  );
};

export default CountdownTimer;
