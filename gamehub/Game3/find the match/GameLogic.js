import {
  themes,
  cardGrid,
  scoreDisplay,
  attemptsLeft,
  completionAudio,
  popup,
  gameOverAudio
} from './Elements.js'

import { showPopup, hidePopup, createCard } from './UI.js'
import { initGame as initUI } from './UI.js'

document.addEventListener('DOMContentLoaded', () => {
  initGame()
})

let matchesMade = 0
let currentThemeIndex = 0
let score = parseInt(localStorage.getItem('score')) || 0
let attempts = parseInt(localStorage.getItem('attempts')) || 5
let firstCard, secondCard

const saveGameState = () => {
  localStorage.setItem('score', score)
  localStorage.setItem('attempts', attempts)
}

export const resetBoard = () => {
  firstCard = null
  secondCard = null
}

export const checkForMatch = () => {
  if (!firstCard || !secondCard) {
    console.error('Not enough cards to check for a match.')
    return
  }

  if (firstCard.dataset.value === secondCard.dataset.value) {
    score++
    matchesMade++
    scoreDisplay.textContent = `Score: ${score}`
    saveGameState()
    resetBoard()

    if (matchesMade === themes[currentThemeIndex].cards.length / 2) {
      nextRound()
    }
  } else {
    attempts--
    attemptsLeft.textContent = `Attempts Left: ${attempts}`
    saveGameState()

    setTimeout(() => {
      firstCard.classList.remove('flipped')
      secondCard.classList.remove('flipped')
      resetBoard()
    }, 500)
  }

  if (attempts === 0) {
    gameOver()
  }
}

export const flipCard = function () {
  if (this.classList.contains('flipped') || secondCard) {
    return
  }

  this.classList.toggle('flipped')

  if (!firstCard) {
    firstCard = this
  } else {
    secondCard = this
    checkForMatch()
  }
}

export const nextRound = () => {
  currentThemeIndex++
  if (currentThemeIndex >= themes.length) {
    completionAudio.play()
    alert("You've completed all rounds!")
    resetGame()
    return
  }
  initGame()
}

export const gameOver = () => {
  gameOverAudio.play()
  showPopup()
  localStorage.removeItem('score')
  localStorage.removeItem('attempts')
  playAgainButton.addEventListener('click', resetGame)
}

export const resetGame = () => {
  currentThemeIndex = 0
  score = 0
  attempts = 5
  saveGameState()
  overlay.style.display = 'none'
  popup.style.display = 'none'
  initGame()
}

// Ensure the score and attempts are displayed correctly on page load
scoreDisplay.textContent = `Score: ${score}`
attemptsLeft.textContent = `Attempts Left: ${attempts}`
