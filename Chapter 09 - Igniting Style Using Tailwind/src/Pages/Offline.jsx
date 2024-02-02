// TicTacToe.js

import React, { useState } from 'react';
import './Offline.css';

const TicTacToe = () => {
    const emptyBoard = Array(9).fill("");
    const [board, setBoard] = useState(emptyBoard);
    const [player, setPlayer] = useState("O");
    const [winner, setWinner] = useState(null);

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    const checkWinner = () => {
        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setWinner(board[a]);
                return true;
            }
        }
        if (board.every(cell => cell !== "")) {
            setWinner("Draw");
            return true;
        }
        return false;
    };

    const handleCellClick = (index) => {
        if (board[index] !== "" || winner) {
            // Cell is already occupied or game is already won/drawn
            return;
        }

        if (checkWinner()) {
            return; // Stop the game when it's won or drawn
        }

        const newBoard = [...board];
        newBoard[index] = player;
        setBoard(newBoard);

        setPlayer(player === "O" ? "X" : "O");
    };

    const restartGame = () => {
        setBoard(emptyBoard);
        setPlayer("O");
        setWinner(null);
    };

    return (
        <div className="game-container">
            <div className="error-container">
                Oops! It seems you're offline. Don't worry, you can still enjoy our game. Have fun!
            </div>
            <div className="tic-tac-toe">
                {board.map((item, index) => (
                    <div
                        className={`cell ${item === "O" ? 'circle' : item === "X" ? 'cross' : ''}`}
                        key={index}
                        onClick={() => handleCellClick(index)}
                    >
                        {item}
                    </div>
                ))}
            </div>
            {winner && (
                <div className="result-message">
                    {winner === "Draw" ? "It's a Draw!" : `${winner} wins!`}
                    <button className='button-tic-tac-toe' onClick={restartGame}>Restart</button>
                </div>
            )}
        </div>
    );
};

export default TicTacToe;