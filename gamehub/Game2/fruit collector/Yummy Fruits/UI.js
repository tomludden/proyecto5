import {
  gameContainer,
  basket,
  scoreDisplay,
  livesDisplay,
  gameOverPopup,
  fruitCollectionAudio,
  sweetCollectionAudio,
  gameOverAudio,
  startButton
} from './Elements.js'

import { fruitImages, sweetImages, endGame, dropItem } from './GameLogic.js'

let score = 0
let lives = 3
let itemSpeed = 1500 // Initial speed in milliseconds
let gameInterval
let itemInterval

export const startGame = () => {
  score = 0
  lives = 3
  itemSpeed = 1500
  scoreDisplay.textContent = `Score: ${score}`
  livesDisplay.textContent = '❤️❤️❤️'
  gameOverPopup.classList.add('hidden')
  startButton.classList.add('hidden')
  gameTitle.classList.add('game-title-background')
  fruitCollectionAudio.volume = 1 // Restore volume
  sweetCollectionAudio.volume = 1
  clearInterval(gameInterval)
  clearInterval(itemInterval)
  itemInterval = setInterval(dropItem, itemSpeed)
  gameInterval = setInterval(increaseSpeed, 20000) // Increase speed every 20 seconds
}

/* export const dropItem = () => {
  const item = document.createElement('div')
  const isFruit = Math.random() < 0.5 // 50% chance for fruit or sweet
  item.classList.add(isFruit ? 'fruit' : 'sweet')
  item.style.left = `${Math.random() * (gameContainer.clientWidth - 50)}px` // Adjusted for image width
  item.style.backgroundImage = `url(${
    isFruit
      ? fruitImages[Math.floor(Math.random() * fruitImages.length)]
      : sweetImages[Math.floor(Math.random() * sweetImages.length)]
  })`
  item.style.width = '50px' // Set width
  item.style.height = '50px' // Set height
  item.style.position = 'absolute' // Ensure position is absolute
  gameContainer.appendChild(item)
  item.style.top = '0px'
  let dropAnimation = setInterval(() => {
    const itemTop = parseInt(getComputedStyle(item).top)
    const basketRect = basket.getBoundingClientRect()
    const itemRect = item.getBoundingClientRect()
    // Check if item is within the basket area
    if (
      itemTop + itemRect.height >=
        basketRect.top - gameContainer.getBoundingClientRect().top &&
      itemRect.left + itemRect.width / 2 >= basketRect.left &&
      itemRect.left + itemRect.width / 2 <= basketRect.right
    ) {
      clearInterval(dropAnimation)
      // Position item just inside the basket
      item.style.top = `${
        basketRect.bottom -
        gameContainer.getBoundingClientRect().top -
        itemRect.height
      }px`
      if (isFruit) {
        fruitCollectionAudio.currentTime = 0 // Reset sound to play from the beginning
        fruitCollectionAudio.play()
        score++
        scoreDisplay.textContent = `Score: ${score}`
      } else {
        sweetCollectionAudio.currentTime = 0 // Reset sound to play from the beginning
        sweetCollectionAudio.play()
        lives--
        updateLives()
        if (lives <= 0) {
          endGame()
          fruitCollectionAudio.volume = 0
          sweetCollectionAudio.volume = 0
        }
      }
      setTimeout(() => gameContainer.removeChild(item), 200) // Wait briefly before removing the item
    } else if (itemTop < gameContainer.clientHeight - 50) {
      item.style.top = `${itemTop + 5}px` // Continue dropping until near the basket
    } else {
      clearInterval(dropAnimation)
      gameContainer.removeChild(item) // Remove item if it falls past the bottom
      // Lose a life if the item is a fruit
      if (isFruit) {
        lives--
        updateLives()
        if (lives <= 0) {
          endGame()
          fruitCollectionAudio.volume = 0
          sweetCollectionAudio.volume = 0
        }
      }
    }
  }, 50)
} */

export const increaseSpeed = () => {
  itemSpeed *= 0.9 // Increase speed by 10%
  clearInterval(itemInterval)
  itemInterval = setInterval(dropItem, itemSpeed)
}

/* export const endGame = () => {
  clearInterval(gameInterval)
  clearInterval(itemInterval)
  gameOverAudio.play()
  gameOverPopup.classList.remove('hidden')
  startButton.classList.remove('hidden')
} */
