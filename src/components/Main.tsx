import React, {useEffect, useState, useRef} from 'react'
import '../styles/Main.css'
import Snake from '../images/snake - Copy.png'
import Apple from '../images/apple.png'
import useInterval from './useInterval'


let canvasX: number;
if (window.outerWidth <= 820) {
	canvasX = window.outerWidth / 1.2
} else {
    canvasX = window.outerWidth / 2
}
const canvasY = window.outerHeight / 2
const initialSnake = [[4,15], [4,15]]
const initialApple = [4, 6]
const scale = 20
const timeDelay = 100

const Main = () => {

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [snake, setSnake] = useState<number[][]>(initialSnake)
  const [apple, setApple] = useState<number[]>(initialApple)
  const [score, setScore] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [delay, setDelay] = useState<number | null>(null)
  const [ direction, setDirection ] = useState([ 0, -1 ])

  useInterval(() => runGame(), delay)

  useEffect(() => {
			let fruit = document.getElementById("fruit") as HTMLCanvasElement
			if (canvasRef.current) {
				const canvas = canvasRef.current
				const ctx = canvas.getContext("2d")
				if (ctx) {
					ctx.setTransform(scale, 0, 0, scale, 0, 0)
					ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
					snake.forEach(([ x , y ]) => {
						ctx.beginPath();
						if (snake === initialSnake) {
							ctx.strokeStyle = "#c1e205"
							ctx.lineWidth = 0.5;
							ctx.arc(x, y, 1, 0, Math.PI * 2, true); // Outer circle
							ctx.moveTo(x + 0.6, y + 0.15)
							ctx.lineWidth = 0.3;
							ctx.arc(x, y + 0.1, 0.6, 0, Math.PI, false); // Mouth (clockwise)
							ctx.moveTo(x - 0.4, y - 0.9);
							ctx.arc(x - 0.4 , y - 0.4, 0.3, 0, Math.PI * 2, false); // Left eye
							ctx.moveTo(x + 0.4, y - 0.9);
							ctx.arc(x + 0.4 , y - 0.4, 0.3, 0, Math.PI * 2, false); // Right eye
							ctx.stroke();
							ctx.fill()
						} else if (snake !== initialSnake && snake.length < 22) {
							ctx.arc(x, y, 0.7, 0, 2 * Math.PI, false);
							if (snake.length % 2 === 0) {
								ctx.fillStyle = "#a3d001"
							} else {
								ctx.fillStyle = "#0d9123"
							}
							ctx.fill()
						} else {
							ctx.arc(x, y, 0.7, 0, 2 * Math.PI, false);
							if (snake.length % 2 === 0) {
								ctx.fillStyle = "#bf48f7"
							} else {
								ctx.fillStyle = "#0af3f3"
							}
							ctx.fill()
						}
				    })
				    ctx.drawImage(fruit, apple[0], apple[1], 2, 2)
			    }}
		},
		[ snake, apple, gameOver ])

  const handleSetScore = () => {
		if (score > Number(localStorage.getItem("snakeScore"))) {
			localStorage.setItem("snakeScore", JSON.stringify(score))
		}
	}

  const startGame = () => {
    setSnake(initialSnake)
    setApple(initialApple)
    setScore(0)
    setGameOver(false)
    setDelay(timeDelay)
    setDirection([ 1, 0 ])
  }

  const checkCollision = (head: number[]) => {
		for (let i = 0; i < head.length; i++) {
			if (head[i] < 0 || head[i] * scale >= canvasX) return true
		}
		for (const s of snake) {
			if (head[0] === s[0] && head[1] === s[1]) return true
		}
		return false
	}

	function appleAte(newSnake: number[][]) {
		let coord = apple.map(() => Math.floor(Math.random() * canvasX / scale / 2))
		if (newSnake[0][0] - 1 === apple[0] && (newSnake[0][1]- 1) === apple[1]) {
			let newApple = coord
			setScore(score + 1)
			setApple(newApple)
			return true
		}
		return false
	}

  const runGame = () => {
    const newSnake = [ ...snake ]
		const newSnakeHead = [ newSnake[0][0] + direction[0], newSnake[0][1] + direction[1] ]
		newSnake.unshift(newSnakeHead)
		if (checkCollision(newSnakeHead)) {
			setDelay(null)
			setGameOver(true)
			handleSetScore()
		}
		if (!appleAte(newSnake)) {
			newSnake.pop()
		}
		setSnake(newSnake)
  }

  const changeDirection = (e: React.KeyboardEvent<HTMLDivElement>) => {
		switch (e.key) {
			case "ArrowLeft":
				setDirection([ -1, 0 ])
				break
			case "ArrowUp":
				setDirection([ 0, -1 ])
				break
			case "ArrowRight":
				setDirection([ 1, 0 ])
				break
			case "ArrowDown":
				setDirection([ 0, 1 ])
				break
		}
	}

  return (
    <div className='Main' onKeyDown={(e) => changeDirection(e)}>
       <div className="score">
        <h2><img src={Apple} alt="an apple illustration created by Luna Smith"/><span>{score}</span></h2>
        <h3>High Score: {localStorage.getItem("snakeScore")}</h3>
      </div>
      <img src={Apple} id='fruit' alt="an apple illustration created by Luna Smith"/>
      <canvas className='playArea' ref={canvasRef} width={`${canvasX}px`} height={`${canvasY}px`} />
      {gameOver && <div className='gameOver'>Game Over</div>}
      <button className='playButton' onClick={startGame}>Play<img src={Snake} width='90' alt=" a snake illustration created by Luna Smith"/></button>
    </div>
  )
}

export default Main