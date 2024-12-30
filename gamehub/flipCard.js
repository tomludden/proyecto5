/* export function createFlipCard(image, link, description) {
  const flipCard = document.createElement('div')
  flipCard.className = 'flip-card'

  const flipCardInner = document.createElement('div')
  flipCardInner.className = 'flip-card-inner'

  const flipCardBack = document.createElement('div')
  flipCardBack.className = 'flip-card-back'
  flipCardBack.style.backgroundImage = `url(${image})`

  const flipCardFront = document.createElement('div')
  flipCardFront.className = 'flip-card-front'

  const gameDescription = document.createElement('p')
  gameDescription.className = 'game-description'
  gameDescription.textContent = description

  const buttonFront = document.createElement('button')
  buttonFront.textContent = 'Play Now'
  buttonFront.className = 'buttonFront'

  buttonFront.addEventListener('click', function (event) {
    event.stopPropagation()
    window.location.href = link
  })

  flipCardInner.addEventListener('click', function () {
    flipCardInner.classList.toggle('flip-card-click')
  })

  flipCardFront.appendChild(gameDescription)
  flipCardFront.appendChild(buttonFront)

  flipCardInner.appendChild(flipCardBack)
  flipCardInner.appendChild(flipCardFront)

  flipCard.appendChild(flipCardInner)

  return flipCard
}
 */
