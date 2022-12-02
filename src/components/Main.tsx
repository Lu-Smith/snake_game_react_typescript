import React from 'react'
import '../styles/Main.css'

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
      <button className='playButton'>Play</button>
     
    </div>
  )
}

export default Main