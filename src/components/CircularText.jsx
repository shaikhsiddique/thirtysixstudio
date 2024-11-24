import React, { useEffect } from 'react';
import './CircularText.css';

const CircularText = () => {
  useEffect(() => {
    const textElement = document.getElementById('circularText');
    const textContent = 'THIRTYSIXSTUDIO — FOR ALL THINGS DIGITAL PRODUCTION —';
    const radius = 120; 

    textElement.innerHTML = textContent
      .split('')
      .map(
        (char, i) =>
          `<span style="
            transform: rotate(${i * (360 / textContent.length)}deg) translateY(-${radius}px);
          ">${char}</span>`
      )
      .join('');
  }, []);

  return (
    <div className="circular-text-container">
      <div id="circularText" className="circular-text"></div>
    </div>
  );
};

export default CircularText;
