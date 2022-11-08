let cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    }]

cardArray = cardArray.concat(cardArray)
cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid');
const scoreDisplay = document.querySelector('#result')
const cardsChosen = []
const cardsChosenIds = []
let score = 0

createBoard();

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const cardElement = document.createElement('img')
        cardElement.setAttribute('src', 'images/blank.png')
        cardElement.setAttribute('data-id', i)
        cardElement.addEventListener('click', flipCard)
        gridDisplay.appendChild(cardElement)
    }
}

function flipCard() {
    document.querySelectorAll('img').forEach(e => e.removeEventListener('click', flipCard))

    let cardId = this.getAttribute('data-id')

    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)

    this.setAttribute('src', cardArray[cardId].img)
    this.removeEventListener('click', flipCard)

    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500)
    }

    document.querySelectorAll('img').forEach(e => e.addEventListener('click', flipCard))
}

function checkMatch() {
    const cardElements = document.querySelectorAll('img')

    if (cardsChosen[0] === cardsChosen[1]) {
        cardElements[cardsChosenIds[0]].setAttribute('src', 'images/white.png')
        cardElements[cardsChosenIds[1]].setAttribute('src', 'images/white.png')
        scoreDisplay.innerHTML = ++score
    } else {
        cardElements[cardsChosenIds[0]].setAttribute('src', 'images/blank.png')
        cardElements[cardsChosenIds[1]].setAttribute('src', 'images/blank.png')
        cardElements[cardsChosenIds[0]].addEventListener('click', flipCard)
        cardElements[cardsChosenIds[1]].addEventListener('click', flipCard)
    }

    cardsChosen.splice(0, cardsChosen.length);
    cardsChosenIds.splice(0, cardsChosenIds.length);
}