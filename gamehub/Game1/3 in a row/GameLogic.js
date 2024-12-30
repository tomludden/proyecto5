import { renderBoard, endGame } from './UI.js'
import { playBtn } from './Elements.js'

export let currentPlayer = 1
export let playerColors = ['blue', 'red']
export let board = ['', '', '', '', '', '', '', '', '']
export let isGameActive = false

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

export const handleSquareClick = (index) => {
  if (board[index] || !isGameActive) return
  board[index] = currentPlayer === 1 ? 'X' : 'O'
  renderBoard(board, playerColors)
  checkWinner()
}

const checkWinner = () => {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      endGame(currentPlayer, combination)
      return
    }
  }
  if (!board.includes('')) {
    endGame(null)
  } else {
    currentPlayer = currentPlayer === 1 ? 2 : 1
  }
}

export const startGame = () => {
  isGameActive = true
  board.fill('')
  renderBoard(board, playerColors)
  playBtn.textContent = 'Play Again'
}

playBtn.addEventListener('click', startGame)
