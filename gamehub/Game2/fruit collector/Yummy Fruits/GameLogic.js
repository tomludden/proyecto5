import {
  gameContainer,
  basket,
  scoreDisplay,
  livesDisplay,
  startButton,
  gameOverPopup,
  gameOverAudio,
  fruitCollectionAudio,
  sweetCollectionAudio,
  gameTitle
} from './Elements.js'

let score = parseInt(localStorage.getItem('score')) || 0
let lives = parseInt(localStorage.getItem('lives')) || 3
let itemSpeed = 2000 // Initial speed in milliseconds
let gameInterval
let itemInterval

export const fruitImages = [
  'https://seeklogo.com/images/B/bananas-logo-D84FBE087F-seeklogo.com.png',
  'https://png.pngtree.com/png-clipart/20230126/original/pngtree-fresh-red-apple-png-image_8930987.png',
  'https://cdn.pixabay.com/photo/2012/04/24/16/09/grapes-40274_640.png',
  'https://png.pngtree.com/png-vector/20240315/ourmid/pngtree-lime-fruit-close-up-png-image_11901535.png',
  'https://www.pngplay.com/wp-content/uploads/6/Shining-Orange-Transparent-PNG.png'
]
export const sweetImages = [
  'https://images.vexels.com/content/240141/preview/candy-wrapper-sweet-0c37f6.png',
  'https://static.vecteezy.com/system/resources/thumbnails/016/408/183/small/3d-sweet-lollipop-free-png.png',
  'https://www.pngplay.com/wp-content/uploads/7/Cotton-Candy-Background-PNG-Image.png'
]

const saveGameState = () => {
  localStorage.setItem('score', score)
  localStorage.setItem('lives', lives)
}

export function startGame() {
  if (
    startButton.textContent === 'Start Game' ||
    startButton.textContent === 'Play Again'
  ) {
    score = 0
    lives = 3
    itemSpeed = 2000
  }
  scoreDisplay.textContent = `Score: ${score}`
  livesDisplay.textContent = '❤️'.repeat(lives)
  gameOverPopup.classList.add('hidden')
  startButton.classList.add('hidden')
  gameTitle.classList.add('game-title-background')
  fruitCollectionAudio.volume = 1
  sweetCollectionAudio.volume = 1
  clearInterval(gameInterval)
  clearInterval(itemInterval)
  itemInterval = setInterval(dropItem, itemSpeed)
  gameInterval = setInterval(increaseSpeed, 10000)
  saveGameState()
}

export const updateLives = () => {
  livesDisplay.textContent = '❤️'.repeat(lives)
  saveGameState()
  if (lives <= 0) {
    endGame()
  }
}

export function dropItem() {
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
        saveGameState()
      } else {
        sweetCollectionAudio.currentTime = 0 // Reset sound to play from the beginning
        sweetCollectionAudio.play()
        lives--
        updateLives()
        if (lives <= 0) {
          fruitCollectionAudio.volume = 0
          sweetCollectionAudio.volume = 0
        }
      }
      setTimeout(() => {
        gameContainer.removeChild(item)
      }, 200) // Wait briefly before removing the item
    } else if (itemTop < gameContainer.clientHeight - 50) {
      item.style.top = `${itemTop + 5}px` // Continue dropping until near the basket
    } else {
      clearInterval(dropAnimation)
      gameContainer.removeChild(item) // Remove item if it falls past the bottom
      if (isFruit) {
        lives--
        updateLives()
        if (lives <= 0) {
          fruitCollectionAudio.volume = 0
          sweetCollectionAudio.volume = 0
        }
      }
    }
  }, 50)
}

function increaseSpeed() {
  itemSpeed *= 0.8
  clearInterval(itemInterval)
  itemInterval = setInterval(dropItem, itemSpeed)
  saveGameState()
}

export function endGame() {
  clearInterval(gameInterval)
  clearInterval(itemInterval)
  gameOverAudio.play()
  gameOverPopup.classList.remove('hidden')
  startButton.classList.remove('hidden')
  startButton.textContent = 'Play Again'
  localStorage.removeItem('score')
  localStorage.removeItem('lives')

  // Remove all fruit and sweet items from the game area
  const items = document.querySelectorAll('.fruit, .sweet')
  items.forEach((item) => gameContainer.removeChild(item))
}

// Initialize the game with saved state
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('score')) {
    score = parseInt(localStorage.getItem('score'))
    lives = parseInt(localStorage.getItem('lives'))
    startButton.textContent = 'Resume Game'
  } else {
    startButton.textContent = 'Start Game'
  }
  scoreDisplay.textContent = `Score: ${score}`
  livesDisplay.textContent = '❤️'.repeat(lives)
  startButton.classList.remove('hidden')

  // Add event listener to the start button
  startButton.addEventListener('click', startGame)
})
