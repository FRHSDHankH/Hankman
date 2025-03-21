//& Word List
const wordList = [
  'duel',
  'bash',
  'win',
  'strike',
  'combat',
  'defend',
  'showdown',
  'conquest',
  'annihilate'
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
  displayedWord = '_'.repeat(selectedWord.length)
  
  updateDifficultyDisplay(level)
  updateUI()

  //& Show Game Area/Difficulty Display, hide selection button
  let gameArea = document.getElementById('gameArea')
  let difficultyBox = document.getElementById('difficultyBox')
  let difficultySelection = document.getElementById('difficultySelection')

  gameArea.classList.remove('d-none')
  gameArea.classList.add('d-block')

  difficultyBox.classList.remove('d-none')
  difficultyBox.classList.add('d-block')

  difficultySelection.classList.add('d-none')

  //& Auto-Focus on input
  document.getElementById('letterInput').focus()
}

function getRandomWord(level) {
  let filteredWords = wordList.filter(word => {
    if (level === 'Easy') return word.length <= 4
    if (level === 'Medium') return word.length >= 5 && word.length <= 7
    if (level === 'Hard') return word.length >= 8
  })

  return filteredWords[Math.floor(Math.random() * filteredWords.length)]
}

//& Update Difficulty Display
function updateDifficultyDisplay(level) {
  let difficultyBox = document.getElementById('difficultyBox')
  difficultyBox.classList.remove('Easy', 'Medium', 'Hard')
  difficultyBox.classList.add(level)
  difficultyBox.textContent = `Difficulty: ${level}`
}

function updateUI() {
  document.getElementById('wordDisplay').textContent = displayedWord.split('').join(' ') //& Show word progress with spaces
}

function guessLetter() {
  let inputField = document.getElementById('letterInput') //& Get input field
  let guessedLetter = inputField.value.toLowerCase() //& Convert input to lowercase

  //& Check if input is a valid letter (a-z)
  if(!guessedLetter.match(/^[a-z]$/)) {
    alert('Please enter a valid letter (a-z)!') //& Alert user if invalid input
    inputField.value = '' //& Clear input field
    return //& Exit function
  }

  //& Check if letter was already guessed
  if(guessedLetters.includes(guessedLetter)) {
    alert(`You already guessed '${guessedLetter}'. Try a different letter!`)
    inputField.value = '' //& Clear input field
    return
  }

  guessedLetters.push(guessedLetter) //& Store guessed letter

  //& Check if guessed letter is in the selected word
  if (selectedWord.includes(guessedLetter)) {
    updateCorrectGuess(guessedLetter)
  } else {
    updateWrongGuess(guessedLetter)
  }

  inputField.value = '' //& Clear input field
  document.getElementById('letterInput').focus() //& Refocus input field for next guess
}