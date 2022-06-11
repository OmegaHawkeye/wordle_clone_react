import React from 'react';
import { useDispatch } from 'react-redux';
import { notify } from 'reapop';
import { deleteChar, submitAttempt, updateBoard } from '../services/game';

export const Key = ({ value, bigger, smaller, disabled, almost, correct }) => {
  const dispatch = useDispatch();

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  const handleOnClick = () => {
    if (disabled) {
      dispatch(notify('Clicked on a already disabled Letter!', 'error'));
      return;
    }
    switch (value) {
      case 'Enter':
        dispatch(submitAttempt());
        break;
      case 'Return':
        dispatch(deleteChar());
        break;
      default:
        dispatch(updateBoard(value));
        break;
    }
  };

  return (
    <>
      {smaller ? (
        <div></div>
      ) : (
        <button
          onClick={handleOnClick}
          className={classNames(
            bigger ? 'col-span-3' : 'col-span-2',
            correct
              ? 'bg-green-500'
              : almost
              ? 'bg-yellow-500'
              : disabled
              ? 'bg-gray-700'
              : 'bg-gray-500 hover:bg-gray-400 focus:bg-gray-400',
            'p-0 justify-center items-center border-none text-white uppercase rounded-md cursor-pointer select-none'
          )}>
          {value}
        </button>
      )}
    </>
  );
};
