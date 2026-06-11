import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='text-2xl h-screen items-center flex gap-10 justify-center'>
      <Link to="/flappybird" style={{ textDecoration: 'none',  }}>
        FlappyBird
      </Link><br />
      <Link to="/tic-tac-toe">
      Tic Tac Toe
      </Link>

    </div>
  )
}

export default Hero