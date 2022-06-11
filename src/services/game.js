import { createSlice } from '@reduxjs/toolkit'
import targetWords from '../targetWords.json'

const boardDefault = [
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
  ['', '', '', '', ''],
]

const initialState = {
  board: boardDefault,
  guessingWord: 'right',
  currentAttempt: 0,
  currentLetterIndex: 0,
  correctLetters: [],
  disabledLetters: [],
  almostLetters: [],
  gameOver: null,
  didGuessWord: null,
  // timeNeeded: { hours: 0, minutes: 0, seconds: 0 },
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    submitAttempt: (state) => {
      if (state.currentLetterIndex !== 5 && state.currentAttempt !== 6) return
      const word = state.board[state.currentAttempt].join('')

      if (word === state.guessingWord) {
        state.currentAttempt += 1
        state.currentLetterIndex = 0
        state.gameOver = true
        state.didGuessWord = true
        state.gameOverModal = true
        return
      }

      if (state.currentAttempt >= 5) {
        state.currentAttempt += 1
        state.currentLetterIndex = 0
        state.gameOver = true
        state.didGuessWord = false
        state.gameOverModal = true
        return
      }
      state.currentAttempt += 1
      state.currentLetterIndex = 0
      state.gameOver = false
    },
    deleteChar: (state) => {
      if (state.currentLetterIndex <= 0) return
      const newBoard = [...state.board]
      newBoard[state.currentAttempt][state.currentLetterIndex - 1] = ''
      state.currentLetterIndex -= 1
      state.board = newBoard
    },
    updateBoard: (state, { payload }) => {
      if (state.currentLetterIndex >= 5) return
      state.board[state.currentAttempt][state.currentLetterIndex] = payload
      state.currentLetterIndex += 1
    },
    setDisabledLetters: (state, { payload }) => {
      return { ...state, disabledLetters: [...state.disabledLetters, payload] }
    },
    setCorrectLetters: (state, { payload }) => {
      return { ...state, correctLetters: [...state.correctLetters, payload] }
    },
    setAlmostLetters: (state, { payload }) => {
      return { ...state, almostLetters: [...state.almostLetters, payload] }
    },
    // setNeededTime: (state, { payload }) => {
    //   return {
    //     ...state,
    //     timeNeeded: {
    //       hours: payload.hours,
    //       minutes: payload.minutes,
    //       seconds: payload.seconds,
    //     },
    //   };
    // },
    restartGame: () => {
      return { ...initialState }
    },
    getRandomWord: (state) => {
      const offsetFromDate = new Date(2022, 0, 1)
      const msOffset = Date.now() - offsetFromDate
      const dayOffset = msOffset / 1000 / 60 / 60 / 24
      state.guessingWord = targetWords[Math.floor(dayOffset)]
    },
  },
  extraReducers: {},
})

export const {
  submitAttempt,
  deleteChar,
  updateBoard,
  setDisabledLetters,
  setAlmostLetters,
  setCorrectLetters,
  // setNeededTime,
  getRandomWord,
  restartGame,
} = gameSlice.actions

export default gameSlice.reducer
