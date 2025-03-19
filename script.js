//& Word List
const wordList = [
  'Duel',
  'Bash',
  'Win',
  'Strike',
  'Combat',
  'Defend',
  'Showdown',
  'Conquest',
  'Annihilate'
]

//& Declare variables
let selectedWord = ''
let displayedWord = ''
let wrongGuesses = 0
let guessedLetters = []
const maxMistakes = 6

//& Start Game Function (runs everything)
function startGame(level) {
  //& Reset Game
  wrongGuesses = 0
  guessedLetters = []

  selectedWord = getRandomWord(level)

  updateDifficultyDisplay(level)

  //& Show Game Area/Difficulty Display, hide selection button
  let gameArea = document.getElementById('gameArea')
  let difficultyBox = document.getElementById('difficultyBox')
  let difficultySelection = document.getElementById('difficultySelection')

  gameArea.classList.remove('d-none')
  gameArea.classList.add('d-block')

  difficultyBox.classList.remove('d-none')
  difficultyBox.classList.add('d-block')

  difficultySelection.classList.add('d-none')
}

function getRandomWord(level) {
  let filteredWords = wordList.filter(word => {
    if (level === 'Easy') return word.length <= 4
    if (level === 'Medium') return word.length >= 5 && word.length <= 7
    if (level === 'Hard') return word.length >= 8
  })

  return filteredWords[Math.floor(Math.random * filteredWords.length)]
}

//& Update Difficulty Display
function updateDifficultyDisplay(level) {
  let difficultyBox = document.getElementById('difficultyBox')
  difficultyBox.classList.remove('Easy', 'Medium', 'Hard')
  difficultyBox.classList.add(level)
  difficultyBox.innerText = `Difficulty: ${level}`
}