import React, { useState } from 'react';
import Timer from './components/Timer'; // Import the Timer component
import CountdownTimer from './components/CountdownTimer'; // Import the CountdownTimer component
import './styles/CountdownTimer.css'; // Import the existing CSS styles

function App() {
  const [targetDate, setTargetDate] = useState('');
  const [showCountdown, setShowCountdown] = useState(true);

  const toggleApp = () => {
    setShowCountdown((prev) => !prev);
  };

  return (
    <div className="app-container">
      <div className="countdown-wrapper">
        <h1 className="title">{showCountdown ? 'Countdown Timer' : 'Automatic Timer'}</h1>

        <button className="toggle-button" onClick={toggleApp}>
          {showCountdown ? 'Switch to Timer' : 'Switch to Countdown'}
        </button>

        {showCountdown ? (
          <CountdownTimer targetDate={targetDate} onDateChange={setTargetDate} /> // Use the CountdownTimer component here
        ) : (
          <Timer />
        )}
      </div>
    </div>
  );
}

export default App;
