import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [topVertices, setTopVertices] = useState(3);
  const [bottomVertices, setBottomVertices] = useState(3);
  const [darkMode, setDarkMode] = useState(false);

  const MAX_VERTICES = 50;
  const MIN_VERTICES = 3;

  const renderDots = (count) => {
    if (count > MAX_VERTICES) {
      count = MAX_VERTICES;
    }
    return Array.from({ length: count }, (_, index) => (
      <button key={index} className='dot'></button>
    ));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <header>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet" />
      </header>
      <div className="title">
        <h1>ColorTaiko!</h1>
      </div>
      <div className="container">
        <div className="input-container">
          <label htmlFor="top-vertices">Top Vertices:</label>
          <input
            id="top-vertices"
            value={topVertices}
            min={MIN_VERTICES}
            max={MAX_VERTICES}
            maxLength={2}
            onChange={(e) => {
              const newValue = Math.min(Math.max(parseInt(e.target.value), MIN_VERTICES), MAX_VERTICES);
              setTopVertices(newValue);
            }}
          />
          <button onClick={() => setTopVertices(Math.min(topVertices + 1, MAX_VERTICES))}>+</button>
          <button onClick={() => setTopVertices(Math.max(topVertices - 1, MIN_VERTICES))}>-</button>
        </div>
        <div className="input-container">
          <label htmlFor="bottom-vertices">Bottom Vertices:</label>
          <input
            id="bottom-vertices"
            type="number"
            value={bottomVertices}
            min={MIN_VERTICES}
            max={MAX_VERTICES}
            maxLength={2}
            onChange={(e) => {
              const newValue = Math.min(Math.max(parseInt(e.target.value), MIN_VERTICES), MAX_VERTICES);
              setBottomVertices(newValue);
            }}
          />
          <button onClick={() => setBottomVertices(Math.min(bottomVertices + 1, MAX_VERTICES))}>+</button>
          <button onClick={() => setBottomVertices(Math.max(bottomVertices - 1, MIN_VERTICES))}>-</button>
        </div>
        <div className="vertices-container">
          {renderDots(topVertices)}
        </div>
        <div className="vertices-container">
          {renderDots(bottomVertices)}
        </div>
      </div>
      <button id="modeSwitch" onClick={toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
    </div>
  );
}

export default App;
