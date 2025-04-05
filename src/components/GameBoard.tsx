import { useState } from 'react';
import '../styles/GameBoard.css';

type Player = 'X' | 'O' | null;

const GameBoard = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<Player>(null);

  const calculateWinner = (squares: Player[]): Player => {
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

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
    
    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const isWinner = (index: number) => winner && board[index] === winner;
  const isLoser = (index: number) => winner && board[index] && board[index] !== winner;

  const status = winner
    ? `Winner: ${winner}`
    : board.every((square) => square !== null)
    ? 'Game Draw!'
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="board">
        {Array(9)
          .fill(null)
          .map((_, index) => (
            <button 
              className={`square${isWinner(index) ? ' winner' : ''}${isLoser(index) ? ' loser' : ''}`}
              onClick={() => handleClick(index)}
            >
              {board[index]}
            </button>
          ))}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default GameBoard; 