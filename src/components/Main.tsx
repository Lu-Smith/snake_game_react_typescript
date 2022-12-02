import React, {useEffect, useState, useRef} from 'react'
import '../styles/Main.css'
import Snake from '../images/snake - Copy.png'
import Apple from '../images/apple.png'
import useInterval from './useInterval'

const canvasX = 500
const canvasY = 500
const initialSnake = [[4,10], [4,10]]
const initialApple = [14,10]
const scale = 50
const timeDelay = 100

const Main = () => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [snake, setSnake] = useState<number[][]>(initialSnake)
  const [apple, setApple] = useState<number[]>(initialApple)
  const [score, setScore] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [delay, setDelay] = useState<number | null>(null)

  useInterval(() => runGame(), delay)

  useEffect(() => {
    let fruit = document.getElementById('fruit') as HTMLCanvasElement
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if(ctx) {
        ctx.setTransform(scale, 0, 0, scale, 0, 0)
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        ctx.fillStyle = '#a3d001'
        snake.forEach(([x,y]) => ctx.fillRect(x, y, 1, 1))
        ctx.drawImage(fruit, apple[0], apple[1], 1, 1)
      }
    }
  }, [snake, apple, gameOver])

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
    setDelay(timeDelay)
  }

  return (
    <div className='Main'>
       <div className="score">
        <h2> Score: {score} </h2>
        <h2> High Score: {score}</h2>
      </div>
      <img src={Apple} id='fruit' width='30' alt="an apple illustration created by Luna Smith"/>
      <canvas className='playArea' ref={canvasRef} width={`${canvasX}px`} height={`${canvasY}px`} />
      {gameOver && <div className='gameOver'>Game Over</div>}
          <button className='playButton' onClick={startGame}>Play<img src={Snake} width='90' alt=" a snake illustration created by Luna Smith"/></button>
    </div>
  )
}

export default Main