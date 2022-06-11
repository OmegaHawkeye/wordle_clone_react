import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Board } from './components/Board'
import { KeyBoard } from './components/KeyBoard'
import NotificationsSystem, {
  atalhoTheme,
  dismissNotification,
  dismissNotifications,
  setUpNotifications,
} from 'reapop'
import { GameOver } from './components/GameOver'
import { Modal } from './components/Modal'
import {
  restartGame,
  getRandomWord,
} from './services/game'

const App = () => {
  const dispatch = useDispatch()

  const notifications = useSelector((state) => state.notifications)

  const { gameOver, didGuessWord } = useSelector((state) => state.game)

  useEffect(() => {
    dispatch(getRandomWord())
    //eslint-disable-next-line
  }, [])

  const handlePlayAgain = () => {
    dispatch(dismissNotifications())
    dispatch(restartGame())
  }

  return (
    <>
      <NotificationsSystem
        notifications={notifications}
        dismissNotification={(id) => dispatch(dismissNotification(id))}
        theme={atalhoTheme}
      />
      <div className='flex flex-col m-0 bg-gray-800 min-h-screen w-full items-center justify-evenly'>
        <header className='w-full h-10 justify-evenly items-center flex mt-4'>
          <h3 className='text-white font-bold pointer-events-none text-4xl'>
            Omega's Wordle
          </h3>
        </header>
        <Board />
        <KeyBoard />
      </div>
      {gameOver && (
        <Modal
          title={
            didGuessWord
              ? '✨🎉 Congrats, U Won! ✨🎉'
              : '😢😭 Unfortuantely, U Lost! 😭😢'
          }
          open={gameOver}
          onClose={handlePlayAgain}>
          <GameOver />
        </Modal>
      )}
    </>
  )
}

setUpNotifications({
  defaultProps: {
    position: 'top-right',
    dismissible: true,
  },
})

export default App
