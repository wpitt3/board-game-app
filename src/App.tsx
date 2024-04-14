import React, { useEffect } from 'react';
import './App.css';
import ChessTimer from "./timer/ChessTimer";

function App() {
  useEffect(() => {
    const preventPullToRefresh = (e: any) => {
      e.preventDefault();
    };

    document.addEventListener('touchmove', preventPullToRefresh, { passive: false });
    return () => {
      document.removeEventListener('touchmove', preventPullToRefresh);
    };
  }, []);

  return (
    <ChessTimer />
  );
}

export default App;
