import React from 'react'
import '../styles/Main.css'

const canvasX = 600
const canvasY = 600

const Main = () => {
  return (
    <div className='Main'>
      <canvas className='playArea' width={`${canvasX}px`} height={`${canvasY}px`}/>
    </div>
  )
}

export default Main