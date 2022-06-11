import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setDisabledLetters,
  setCorrectLetters,
  setAlmostLetters,
} from '../services/game'

export const Letter = ({ letterPos, attemptVal }) => {
  const { board, guessingWord, currentAttempt, disabledLetters } = useSelector(
    (state) => state.game
  )

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
  }

  const dispatch = useDispatch()

  const currentLetter = board[attemptVal][letterPos]

  const correct = guessingWord[letterPos] === currentLetter.toLowerCase()
  const almost =
    !correct &&
    currentLetter !== '' &&
    guessingWord.includes(currentLetter.toLowerCase())

  useEffect(() => {
    if (currentLetter === '') return
    if (correct && !almost)
      dispatch(setCorrectLetters(currentLetter.toLowerCase()))
    else if (!correct && almost)
      dispatch(setAlmostLetters(currentLetter.toLowerCase()))
    else if (
      !correct &&
      !almost &&
      !disabledLetters.includes(currentLetter.toLowerCase())
    ) {
      dispatch(setDisabledLetters(currentLetter.toLowerCase()))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAttempt])

  return (
    <div
      className={classNames(
        currentAttempt > attemptVal &&
          (correct ? 'bg-green-500' : almost ? 'bg-yellow-500' : 'bg-gray-500'),
        'text-white border-solid border-[.05em] border-gray-600 uppercase font-bold flex justify-center items-center select-none'
      )}>
      {currentLetter}
    </div>
  )
}
