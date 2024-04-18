import React, { useState, useEffect } from 'react';
import "../styles/TextAnimation.css"

const getRandomPosition = () => {
  // Generate a random translation within a certain range
  const x = Math.random() * 100 - 50; // Random value between -50 and 50
  const y = Math.random() * 100 - 50; // Random value between -50 and 50
  return `translate(${x}px, ${y}px)`; // Return a CSS transform string
};

const FlyingText = ({ text, interval = 100 }) => {
  const [displayedText, setDisplayedText] = useState([]);

  useEffect(() => {
    let index = 0;
    const maxIndex = text.length;
    const timer = setInterval(() => {
      const transform = getRandomPosition();
      const char = text.charAt(index) === ' ' ? '\u00A0' : text.charAt(index);
      setDisplayedText(prev => [...prev, { char, key: index, transform }]);
      index++;
      if (index === maxIndex) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);  // Clean up the interval on component unmount
  }, [text, interval]);

  return (
    <div className="flying-text">
      {displayedText.map(({ char, key, transform }) => (
        <span
          key={key}
          className="char"
          style={{
            animationDelay: `${key * (interval / 20000)}s`,
            transform
          }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default FlyingText;
