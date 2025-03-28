//& Word List
let wordList = [
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

let gameArea = document.getElementById('gameArea')
let difficultyBox = document.getElementById('difficultyBox')
let difficultySelection = document.getElementById('difficultySelection')
let endText = document.getElementById('endText')
let endContainer = document.getElementById('endContainer')
let title = document.getElementById('title')
let vidChange = document.getElementById('vidChange')
let vid = document.getElementById('vid')

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
  gameArea.classList.remove('d-none')
  gameArea.classList.add('d-block')
  difficultyBox.classList.remove('d-none')
  difficultyBox.classList.add('d-block')
  difficultySelection.classList.remove('d-block')
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
  difficultyBox.classList.remove('Easy', 'Medium', 'Hard', 'Custom')
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

function addWord(level) {
  let wordInput = document.getElementById('wordInput') //& Get input field
  let word = wordInput.value.toLowerCase()

  //& Reset Game
  wrongGuesses = 0
  guessedLetters = []

  selectedWord = word
  displayedWord = '_'.repeat(selectedWord.length)
  
  updateDifficultyDisplay(level)
  updateUI()

  //& Show Game Area/Difficulty Display, hide selection button
  gameArea.classList.remove('d-none')
  gameArea.classList.add('d-block')
  difficultyBox.classList.remove('d-none')
  difficultyBox.classList.add('d-block')
  difficultySelection.classList.remove('d-block')
  difficultySelection.classList.add('d-none')

  //& Auto-Focus on input
  document.getElementById('letterInput').focus()

  wordInput.value = '' //& Clear input field
  document.getElementById('wordInput').focus() //& Refocus input field for next guess
}

function updateWrongGuess(guessedLetter) {
  if (wrongGuesses === 0) {
    document.getElementById('wrongLetters').textContent += `${guessedLetter}`
  } else {
    document.getElementById('wrongLetters').textContent += `, ${guessedLetter}`
  }
  wrongGuesses++
  vidChange.src = `vids/video${6-wrongGuesses}.mp4`
  vid.load()
  vid.play()
  let wrongSound = new Audio('wrong.mp3')
  wrongSound.play()

  if (wrongGuesses === maxMistakes) {
    endGame(false)
  }
}

function updateCorrectGuess(guessedLetter) {
  let newDisplayedWord = ''

  for (let i = 0; i < selectedWord.length; i++) {
    if (selectedWord[i] === guessedLetter) {
      newDisplayedWord += guessedLetter //& Replace underscore with correct letter
    } else {
      newDisplayedWord += displayedWord[i] //& Keep existing correct letters
    }
  }

  displayedWord = newDisplayedWord
  updateUI()

  if (!displayedWord.includes('_')) {
    endGame(true)
  }

  let rightSound = new Audio('right.mp3')
  rightSound.play()
}

function endGame(won) {
    if (won === true) {
      difficultyBox.classList.add('d-none')
      gameArea.classList.add('d-none')
      title.classList.add('d-none')
      setTimeout(() => endText.textContent = `Congratulations you won! The word was "${selectedWord}".`, 100)
      setTimeout(() => endContainer.classList.remove('d-none'), 100)
    } else {
      setTimeout(() => {
        difficultyBox.classList.add('d-none')
        gameArea.classList.add('d-none')
        title.classList.add('d-none')
        setTimeout(() => endText.textContent = `Sorry you died... the word was "${selectedWord}" you idiot!`, 100)
        setTimeout(() => endContainer.classList.remove('d-none'), 100)
      }, 4000)
    }
}

//& Add an event listener to task input to check if enter key is pressed
document.getElementById("letterInput").addEventListener("keydown", (event) => {
  //& Checks if enter key is pressed
  if (event.key === "Enter") {
    guessLetter()
  }
});

//& Add an event listener to add word to check if enter key is pressed
document.getElementById("wordInput").addEventListener("keydown", (event) => {
  //& Checks if enter key is pressed
  if (event.key === "Enter") {
    addWord('Custom')
  }
});

function restartGame() {
  //& Reset Game
  wrongGuesses = 0
  guessedLetters = []
  selectedWord = ''
  displayedWord = ''
  document.getElementById('wrongLetters').textContent = `Wrong Guesses: `

  //& Back to home screen
  gameArea.classList.remove('d-block')
  gameArea.classList.add('d-none')
  difficultyBox.classList.remove('d-block')
  difficultyBox.classList.add('d-none')
  difficultySelection.classList.remove('d-none')
  difficultySelection.classList.add('d-block')
  endContainer.classList.remove('d-block')
  endContainer.classList.add('d-none')
  title.classList.remove('d-none')
  title.classList.add('d-block')
  document.getElementById('vidChange').src = 'vids/video6.mp4'
  vid.load()

  //& Reset end screen text
  endText.textContent = ''
}