import React, { useState } from 'react';
import './App.css';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [nextPlayer, setNextPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }
    if (board.every(square => square !== null)) {
      setWinner('draw');
    }
  };

  const handleClick = index => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = nextPlayer;
    setBoard(newBoard);
    checkWinner();
    setNextPlayer(nextPlayer === 'X' ? 'O' : 'X');
  };

  const renderSquare = index => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  const renderStatus = () => {
    if (winner) {
      if (winner === 'draw') {
        return 'It\'s a draw!';
      }
      return `Winner: ${winner}`;
    }
    return `Next player: ${nextPlayer}`;
  };

  return (
    <div className="game">
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <div className="game-info">{renderStatus()}</div>
    </div>
  );
};

export default App;
