import { handleSquareClick } from './GameLogic.js'
import {
  gameBoard,
  player1ColorSelect,
  player2ColorSelect,
  player1Audio,
  player2Audio
} from './Elements.js'

let isGameActive = false

export const renderBoard = (board, playerColors) => {
  const squares = document.querySelectorAll('.square')
  squares.forEach((square, index) => {
    square.textContent = board[index]
    square.className = 'square'
    if (board[index] === 'X') {
      square.setAttribute('data-player', '1')
    } else if (board[index] === 'O') {
      square.setAttribute('data-player', '2')
    }
  })
}

export const endGame = (winner, winningCombo) => {
  isGameActive = false
  const squares = document.querySelectorAll('.square')
  if (winner) {
    winningCombo.forEach((index) => {
      squares[index].classList.add('winner')
    })
    setTimeout(() => {
      alert(`Winner Player ${winner}`)
      if (winner === 1) {
        player1Audio.play()
      } else {
        player2Audio.play()
      }
    }, 500)
  } else {
    setTimeout(() => {
      alert("It's a draw!")
    }, 500)
  }
}

export const createBoard = () => {
  gameBoard.innerHTML = '' // Clear the board first
  for (let i = 0; i < 9; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    square.addEventListener('click', () => handleSquareClick(i))
    gameBoard.appendChild(square)
  }
}

// Add color change event listeners
player1ColorSelect.addEventListener('change', () => {
  document.documentElement.style.setProperty(
    '--player1-color',
    player1ColorSelect.value
  )
  renderBoard(board, playerColors)
})

player2ColorSelect.addEventListener('change', () => {
  document.documentElement.style.setProperty(
    '--player2-color',
    player2ColorSelect.value
  )
  renderBoard(board, playerColors)
})
