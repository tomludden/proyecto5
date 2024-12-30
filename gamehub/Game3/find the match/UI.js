import {
  resetBoard,
  checkForMatch,
  flipCard,
  gameOver,
  resetGame
} from './GameLogic.js'

import { themes } from './Elements.js'

let matchesMade = 0
let currentThemeIndex = 0
let score = 0
let attempts = 5
let firstCard, secondCard

const cardGrid = document.querySelector('.card-grid')
const scoreDisplay = document.querySelector('.score')
const attemptsLeft = document.querySelector('.attempts')
const completionAudio = new Audio('homer_simpson_woohoo_sound_effect.mp3')

export const initGame = () => {
  // Load the score and attempts from localStorage
  score = parseInt(localStorage.getItem('score')) || 0
  attempts = parseInt(localStorage.getItem('attempts')) || 5

  scoreDisplay.textContent = `Score: ${score}`
  attemptsLeft.textContent = `Attempts Left: ${attempts}`

  hidePopup()
  const currentTheme = themes[currentThemeIndex]
  matchesMade = 0

  const combined = currentTheme.cards
    .map((card, index) => ({ card, index }))
    .sort(() => Math.random() - 0.5)

  cardGrid.innerHTML = '' // Clear the grid
  combined.forEach(({ card, index }) => {
    createCard(card, currentTheme.imageClasses[index])
  })
}
export function hidePopup() {
  const overlay = document.querySelector('.overlay')
  const popup = document.querySelector('.popup')

  overlay.style.display = 'none'
  popup.style.display = 'none'
}

export function createCard(cardValue, imageClass) {
  const card = document.createElement('div')
  card.classList.add('card', imageClass)
  card.dataset.value = cardValue

  card.addEventListener('click', flipCard)
  cardGrid.appendChild(card)
}

export function showPopup() {
  const overlay = document.querySelector('.overlay')
  const popup = document.querySelector('.popup')

  overlay.style.display = 'block'
  popup.style.display = 'block'
}
