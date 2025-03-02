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

// Initialize game state from localStorage or set default values
let score = parseInt(localStorage.getItem('score')) || 0
let lives = parseInt(localStorage.getItem('lives')) || 3
let itemSpeed = parseInt(localStorage.getItem('itemSpeed')) || 1500 // Initial speed in milliseconds
let gameInterval
let itemInterval

// Define the fruit and sweet images
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

// Save game state to localStorage
function saveGameState() {
  localStorage.setItem('score', score)
  localStorage.setItem('lives', lives)
  localStorage.setItem('itemSpeed', itemSpeed)
}

// Function to start or resume the game
export function startGame() {
  // If no game state in localStorage, it's a new game
  if (!localStorage.getItem('score') || !localStorage.getItem('lives')) {
    // Start a new game
    score = 0
    lives = 3
    itemSpeed = 1500
    scoreDisplay.textContent = `Score: ${score}`
    livesDisplay.textContent = '❤️'.repeat(lives)
  } else {
    // Resume the game with the saved state
    score = parseInt(localStorage.getItem('score'))
    lives = parseInt(localStorage.getItem('lives'))
    itemSpeed = parseInt(localStorage.getItem('itemSpeed'))
    scoreDisplay.textContent = `Score: ${score}`
    livesDisplay.textContent = '❤️'.repeat(lives)
  }

  gameOverPopup.classList.add('hidden')
  startButton.classList.add('hidden')
  gameTitle.classList.add('game-title-background')
  fruitCollectionAudio.volume = 1
  sweetCollectionAudio.volume = 1

  // Clear previous intervals
  clearInterval(gameInterval)
  clearInterval(itemInterval)

  // Start new intervals for item drop and speed increase
  itemInterval = setInterval(dropItem, itemSpeed)
  gameInterval = setInterval(increaseSpeed, 15000)

  saveGameState() // Ensure the current state is saved
}

// Function to update lives display
export const updateLives = () => {
  livesDisplay.textContent = '❤️'.repeat(lives)
  saveGameState() // Save the updated lives to localStorage
}

// Function to drop items (fruit or sweets)
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
          endGame()
          fruitCollectionAudio.volume = 0
          sweetCollectionAudio.volume = 0
        }
      }
    }
  }, 50)

  saveGameState() // Save updated game state
}

// Function to increase item speed over time
function increaseSpeed() {
  itemSpeed *= 0.9 // Increase speed by 10%
  clearInterval(itemInterval)
  itemInterval = setInterval(dropItem, itemSpeed)
  saveGameState() // Save updated speed to localStorage
}

// Function to end the game
export function endGame() {
  clearInterval(gameInterval)
  clearInterval(itemInterval)
  gameOverAudio.play()
  gameOverPopup.classList.remove('hidden')
  startButton.classList.remove('hidden')
  startButton.textContent = 'Play Again'

  // Reset game state in localStorage on game over
  localStorage.removeItem('score')
  localStorage.removeItem('lives')
  localStorage.removeItem('itemSpeed')

  // Optionally clear all game items from the container
  const items = document.querySelectorAll('.fruit, .sweet')
  items.forEach((item) => gameContainer.removeChild(item))
}

// Set the button text and functionality on page load
document.addEventListener('DOMContentLoaded', () => {
  // Check if a game state exists in localStorage
  if (localStorage.getItem('score') && localStorage.getItem('lives')) {
    startButton.textContent = 'Resume Game' // If saved state exists, show "Resume Game"
    // Display the saved score and lives immediately on load
    scoreDisplay.textContent = `Score: ${score}`
    livesDisplay.textContent = '❤️'.repeat(lives)
  } else {
    startButton.textContent = 'Start Game' // If no saved state, show "Start Game"
    scoreDisplay.textContent = `Score: 0` // Show default score
    livesDisplay.textContent = '❤️'.repeat(3) // Show default lives
  }

  // Add the click event listener for the start/resume button
  startButton.addEventListener('click', () => {
    startGame()
  })
})
