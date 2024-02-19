import React, { useState ,useRef, useEffect} from 'react';
import './App.css';

const App = () => {
  const [topVertices, setTopVertices] = useState(3);
  const [bottomVertices, setBottomVertices] = useState(3);
  const [darkMode, setDarkMode] = useState(false);
  const [lines, setLines] = useState([]); // Add state to track lines
  const [drawingLine, setDrawingLine] = useState(null); // Track the line being drawn
  const MAX_VERTICES = 50;
  const dotRefs = useRef([]);
  const MIN_VERTICES = 3;

  const Dot = React.forwardRef(({ onClick }, ref) => (
    <button ref={ref} className="dot" onClick={onClick}></button>
  ));
  

  useEffect(() => {
    // Adjust refs array size when vertex count changes
    dotRefs.current = dotRefs.current.slice(0, topVertices + bottomVertices);
  }, [topVertices, bottomVertices]);

  const handleDotClick = (index) => {
    const dot = dotRefs.current[index];
    const rect = dot.getBoundingClientRect();
    const svgRect = document.querySelector('.container svg').getBoundingClientRect();
    const position = { x: rect.left - svgRect.left + rect.width / 2, y: rect.top - svgRect.top + rect.height / 2 };

    if (lines.length && !lines[lines.length - 1].end) {
      setLines(lines => [...lines.slice(0, -1), { ...lines[lines.length - 1], end: position }]);
    } else {
      setLines(lines => [...lines, { start: position, end: null }]);
    }
  };
  let colors = ['purple', 'lightblue', 'green', 'red', 'orange', 'pink', 'mediumslateblue', 'mediumseagreen', 'rgb(183, 183, 244)', 
                      'rosybrown', 'olivedrab', 'crimson', 'rgb(213, 213, 55)', 'palevioletred', 'indigo', 'coral', 'teal', 'plum', 
                      'navy', 'yellowgreen'];





  // const handleDotClick = (index, position) => {
  //   if (!drawingLine) {
  //     setDrawingLine({ start: { index, position }, end: null });
  //   } else {
  //     setLines([...lines, { start: drawingLine.start.position, end: position }]);
  //     setDrawingLine(null);
  //   }
  // };
  const renderDots = (count, offset) => {
    return Array.from({ length: count }, (_, index) => (
      <Dot
        key={index}
        ref={el => dotRefs.current[offset + index] = el}
        onClick={() => handleDotClick(offset + index)}
      />
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
          {renderDots(topVertices, 0)}
        </div>
        <div className="vertices-container" style={{ marginTop: '100px' }}>
          {renderDots(bottomVertices, topVertices)}
        </div>
        <svg style={{ position: 'absolute',  top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
          {lines.map((line, index) => line.end && (
            <line key={index} x1={line.start.x} y1={line.start.y} x2={line.end.x} y2={line.end.y}
                  stroke={colors[index % colors.length]} strokeWidth="2" />
          ))}
        </svg>
      </div>
      <button id="modeSwitch" onClick={toggleDarkMode}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
    </div>
  );
}

export default App;
