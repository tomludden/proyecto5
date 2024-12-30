export function createCardGrid() {
  const container = document.createElement('div')
  container.className = 'card-grid'
  document.body.appendChild(container)

  const images = ['game1.png', 'game2.png', 'game3.png']
  const links = [
    'Game1/3 in a row/index.html',
    'Game2/fruit collector/Yummy Fruits/index.html',
    'Game3/find the match/index.html'
  ]
  const descriptions = [
    '3 in a row - the classic game to play with friends',
    'Yummy Fruits - can you collect as many fruits as possible while avoiding the tempting sweets?',
    'Match It - 3 rounds of matching pairs...are you up to the challenge?'
  ]

  for (let i = 0; i < 3; i++) {
    const flipCard = createFlipCard(images[i], links[i], descriptions[i])
    container.appendChild(flipCard)
  }
}

export function createFlipCard(image, link, description) {
  const flipCard = document.createElement('div')
  flipCard.className = 'flip-card'

  const flipCardInner = document.createElement('div')
  flipCardInner.className = 'flip-card-inner'

  const flipCardBack = document.createElement('div')
  flipCardBack.className = 'flip-card-back'
  flipCardBack.style.backgroundImage = `url(${image})` // Background image for the card back

  const flipCardFront = document.createElement('div')
  flipCardFront.className = 'flip-card-front'

  const gameDescription = document.createElement('p')
  gameDescription.className = 'game-description'
  gameDescription.textContent = description

  const buttonFront = document.createElement('button')
  buttonFront.textContent = 'Play Now'
  buttonFront.className = 'buttonFront'

  buttonFront.addEventListener('click', function (event) {
    event.stopPropagation() // Prevent the flip event from triggering
    window.location.href = link // Redirect to the game link
  })

  flipCardInner.addEventListener('click', function () {
    flipCardInner.classList.toggle('flip-card-click') // Toggle flip effect
  })

  flipCardFront.appendChild(gameDescription)
  flipCardFront.appendChild(buttonFront)

  flipCardInner.appendChild(flipCardBack)
  flipCardInner.appendChild(flipCardFront)

  flipCard.appendChild(flipCardInner)

  return flipCard
}
