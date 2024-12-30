import { startGame } from './GameLogic.js'
import './Controls.js'
import { startButton } from './Elements.js'

document.addEventListener('DOMContentLoaded', () => {
  startButton.addEventListener('click', startGame)
})
