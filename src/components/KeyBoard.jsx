import React, { Fragment, useEffect, useCallback } from 'react'
import { Key } from './Key'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { deleteChar, submitAttempt, updateBoard } from '../services/game'
import { notify } from 'reapop'

export const KeyBoard = () => {
  const dispatch = useDispatch()
  const store = useStore()

  const { disabledLetters, almostLetters, correctLetters } = useSelector(
    (state) => state.game
  )

  const keyboardList = [
    ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P'],
    ['', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Y', 'X', 'C', 'V', 'B', 'N', 'M', 'Return'],
  ]

  const deadKeys = [
    'Tab',
    'Shift',
    'CapsLock',
    'Control',
    'F1',
    'F2',
    'F3',
    'F4',
    'F5',
    'F6',
    'F7',
    'F8',
    'F9',
    'F10',
    'F11',
    'F12',
    'ContextMenu',
    'Escape',
    'Alt',
    'Insert',
    'Home',
    'PageUp',
    'PageDown',
    'End',
    'Dead',
    'AltGraph',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Meta',
    '+',
    '-',
    '#',
    '~',
    '*',
    "'",
    '´',
    '`',
    '<',
    '>',
    ',',
    '.',
    '|',
    '"',
  ]

  const handleKeyDown = useCallback((e) => {
    if (e.key === ' ' || checkDeadKeys(e.key) || checkDisabledLetters(e.key))
      return
    if (e.key === 'Enter') dispatch(submitAttempt())
    else if (e.key === 'Backspace' || e.key === 'Delete') dispatch(deleteChar())
    else {
      dispatch(updateBoard(e.key))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const checkDeadKeys = (key) => {
    if (deadKeys.includes(key))
      dispatch(notify('Clicked on a dead Key(e.g.: Shift/Control)!', 'info'))
    return deadKeys.includes(key)
  }

  const checkDisabledLetters = (key) => {
    const state = store.getState()
    if (state.game.disabledLetters.includes(key.toLowerCase()))
      dispatch(notify('Clicked on a already disabled Letter!', 'error'))
    return state.game.disabledLetters.includes(key.toLowerCase())
  }

  // const handleKeyDown = useCallback((e) => {
  //   switch (e.key) {
  //     case ' ':
  //     case checkDeadKeys(e.key):
  //     case checkDisabledLetters(e.key):
  //       console.log('Pressed a forbidden Key: ', e.key);
  //       break;
  //     case 'Enter':
  //       dispatch(submitAttempt());
  //       break;
  //     case 'Backspace':
  //     case 'Delete':
  //       dispatch(deleteChar());
  //       break;
  //     default:
  //       dispatch(updateBoard(e.key));
  //       break;
  //   }
  // });

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='grid grid-cols-20 gap-1 auto-rows-[3em] justify-center mb-10'>
      {keyboardList.map((row, rowIndex) => (
        <Fragment key={rowIndex}>
          {row.map((key, index) => (
            <Key
              key={`${rowIndex}_${index}`}
              value={key}
              bigger={key === 'Enter' || key === 'Return'}
              smaller={key === ''}
              disabled={disabledLetters.includes(key.toLowerCase())}
              correct={correctLetters.includes(key.toLowerCase())}
              almost={almostLetters.includes(key.toLowerCase())}
            />
          ))}
        </Fragment>
      ))}
    </div>
  )
}
