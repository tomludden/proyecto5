export const cardGrid = document.querySelector('.card-grid')
export const scoreDisplay = document.querySelector('.score')
export const attemptsLeft = document.querySelector('.attempts')
export const overlay = document.querySelector('.overlay')
export const popup = document.querySelector('.popup')
export const gameOverAudio = new Audio('assets/kr-exa-game-over-sound.mp3')
export const completionAudio = new Audio(
  'assets/homer_simpson_woohoo_sound_effect.mp3'
)
export const playAgainButton = document.querySelector('.play-again-button')

export const themes = [
  {
    cards: [
      '🍎',
      '🍌',
      '🍇',
      '🍉',
      '🍓',
      '🍊',
      '🍎',
      '🍌',
      '🍇',
      '🍉',
      '🍓',
      '🍊'
    ],
    imageClasses: ['card-0', 'card-1', 'card-2', 'card-3', 'card-4', 'card-5']
  },
  {
    cards: [
      '🚗',
      '🚕',
      '🚙',
      '🚌',
      '🚎',
      '🚑',
      '🚗',
      '🚕',
      '🚙',
      '🚌',
      '🚎',
      '🚑'
    ],
    imageClasses: [
      'card-6',
      'card-7',
      'card-8',
      'card-9',
      'card-10',
      'card-11'
    ],
    audio: 'round-2.mp3'
  },
  {
    cards: [
      '⚽',
      '🏀',
      '🏈',
      '🎾',
      '🏐',
      '🎱',
      '⚽',
      '🏀',
      '🏈',
      '🎾',
      '🏐',
      '🎱'
    ],
    imageClasses: [
      'card-12',
      'card-13',
      'card-14',
      'card-15',
      'card-16',
      'card-17'
    ],
    audio: 'round-3.mp3'
  }
]
