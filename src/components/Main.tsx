import React, {useState} from 'react'
import '../styles/Main.css'
import Snake from '../images/snake - Copy.png'
import Apple from '../images/apple.png'

const canvasX = 600
const canvasY = 600
const initialSnake = [[4,10], [4,10]]
const initialApple = [14,10]

const Main = () => {

  const [snake, setSnake] = useState(initialSnake)
  const [ apple, setApple] = useState(initialApple)
  
  const startGame = () => {
     
  }

  return (
    <div className='Main'>
       <div className="score">
        <h2> Score: </h2>
        <h2> High Score: </h2>
      </div>
      <img src={Apple} width='90'/>
      <canvas className='playArea' width={`${canvasX}px`} height={`${canvasY}px`} />
          <button className='playButton' onClick={startGame}>Play<img src={Snake} width='90'/></button>
    </div>
  )
}

export default Main