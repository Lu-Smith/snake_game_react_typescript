import React from 'react'
import '../styles/Header.css'
import Snake from '../images/snake.png'

const Header = () => {
  return (
    <div className='Header'>
       <img src={Snake} alt="a snake illustration created by Luna Smith"/><span>Snake Game</span>
    </div>
  )
}

export default Header