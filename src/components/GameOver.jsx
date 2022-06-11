import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notify, dismissNotifications } from 'reapop';
import { restartGame } from '../services/game';
import { HeartIcon, ShareIcon, PlayIcon } from '@heroicons/react/solid';

export const GameOver = () => {
  const dispatch = useDispatch();

  const { didGuessWord, currentAttempt, guessingWord } = useSelector(
    (state) => state.game
  );

  const handlePlayAgain = () => {
    dispatch(dismissNotifications());
    dispatch(restartGame());
  };

  const handleShare = () => {
    dispatch(notify('Feature is coming soon!', 'info'));
  };

  const handleRateUs = () => {
    dispatch(notify('Feature is coming soon!', 'info'));
  };

  return (
    <div className='w-full h-full flex flex-col justify-evenly items-center'>
      {didGuessWord ? (
        <span>
          You guessed the word in {currentAttempt}{' '}
          {currentAttempt === 1 ? 'attempt' : 'attempts'}
        </span>
      ) : (
        <>
          <span>
            Correct Word is <b>{guessingWord.toUpperCase()}</b>
          </span>
          <span>Next time u get it right! 👍</span>
        </>
      )}
      <div className='flex justify-evenly items-center my-5 space-x-2'>
        <button
          onClick={handleShare}
          className='inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800'>
          <ShareIcon className='w-4 h-4 mr-3 fill-current' />
          <span>Share!</span>
        </button>
        <button
          onClick={handleRateUs}
          className='inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800'>
          <HeartIcon className='w-4 h-4 mr-3 fill-current' />
          <span>Rate Us!</span>
        </button>
        <button
          onClick={handlePlayAgain}
          className='inline-flex items-center h-10 px-5 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800'>
          <PlayIcon className='w-4 h-4 mr-3 fill-current' />
          <span>Play Again!</span>
        </button>
      </div>
    </div>
  );
};
