import React, { Fragment } from 'react'
import { Letter } from './Letter'
import { useSelector } from 'react-redux'

export const Board = () => {
  const { board } = useSelector((state) => state.game)

  return (
    <div className='grid justify-center content-center flex-grow gap-1 grid-rows-[repeat(6,4em)] grid-cols-[repeat(5,4em)]'>
      {board.map((row, rowIndex) => (
        <Fragment key={rowIndex}>
          {row.map((_tile, index) => (
            <Letter
              key={`${rowIndex}_${index}`}
              letterPos={index}
              attemptVal={rowIndex}
            />
          ))}
        </Fragment>
      ))}
    </div>
  )
}
