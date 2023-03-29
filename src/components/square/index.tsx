import React, { MouseEventHandler } from 'react';
import './square.css';

interface squareProps {
  value: string|null;
  onSquareClick: MouseEventHandler;
}

export default function Square ({value, onSquareClick}: squareProps){
  return (
    <button
     className="square"
     onClick={onSquareClick}
     >
      {value}
    </button>
  );
}
