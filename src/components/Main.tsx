import React from 'react'
import '../styles/Main.css'
import Snake from '../images/snake - Copy.png'

const canvasX = 600
const canvasY = 600

const Main = () => {
  return (
    <div className='Main'>
       <div className="score">
        <h2> Score: </h2>
        <h2> High Score: </h2>
      </div>
      <canvas className='playArea' width={`${canvasX}px`} height={`${canvasY}px`} />
          <button className='playButton'>Play<img src={Snake} width='90'/></button>
    </div>
  )
}

export default Main