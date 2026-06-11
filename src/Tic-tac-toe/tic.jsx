import React, { useState } from 'react'
import Boxes from './boxes'

function Tic() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const winner = calculateWinner(board)
  const isDraw = !winner && board.every((square) => square !== null)

  let status
  if (winner) {
    status = `Winner: ${winner}`
  } else if (isDraw) {
    status = "It's a Draw!"
  } else {
    status = `Next Player: ${xIsNext ? 'X' : 'O'}`
  }

  const handleClick = (index) => {
    if (board[index] || winner) return

    const newBoard = board.slice()
    newBoard[index] = xIsNext ? 'X' : 'O'
    
    setBoard(newBoard)
    setXIsNext(!xIsNext)
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white font-sans p-4">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">Tic Tac Toe</h1>
      
      <div className="h-12 flex items-center justify-center text-2xl sm:text-3xl font-semibold mb-4 text-emerald-500">
        {status}
      </div>

      <div className="grid grid-cols-3 grid-rows-3 gap-3 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] ">
        {board.map((value, index) => (
          <Boxes 
            key={index} 
            value={value} 
            onBoxclick={() => handleClick(index)} 
          />
        ))}
      </div>

      <button 
        onClick={resetGame}
        className="mt-10 px-8 py-3 bg-emerald-600 hover:bg-emerald-600 font-bold text-lg rounded-lg transition-all active:scale-95"
      >
        Reset Game
      </button>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export default Tic
