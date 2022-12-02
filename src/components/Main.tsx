import React, {useState} from 'react'
import '../styles/Main.css'
import Snake from '../images/snake - Copy.png'
import Apple from '../images/apple.png'
import { setSourceMapRange } from 'typescript'

const canvasX = 600
const canvasY = 600
const initialSnake = [[4,10], [4,10]]
const initialApple = [14,10]

const Main = () => {

  const [snake, setSnake] = useState(initialSnake)
  const [apple, setApple] = useState(initialApple)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  const runGame = () => {
    const newSnake = [...snake]
    const newSnakeHead = [newSnake[0][0], newSnake[0][1]]
    newSnake.unshift(newSnakeHead)
    setSnake(newSnake)
  }

  const startGame = () => {
    setSnake(initialSnake)
    setApple(initialApple)
    setScore(0)
    setGameOver(false)
    
    runGame()
  }

  return (
    <div className='Main'>
       <div className="score">
        <h2> Score: {score} </h2>
        <h2> High Score: {score} </h2>
      </div>
      <img src={Apple} width='90' alt="an apple illustration created by Luna Smith"/>
      <canvas className='playArea' width={`${canvasX}px`} height={`${canvasY}px`} />
      {gameOver && <div className='gameOver'>Game Over</div>}
          <button className='playButton' onClick={startGame}>Play<img src={Snake} width='90' alt=" a snake illustration created by Luna Smith"/></button>
    </div>
  )
}

export default Main