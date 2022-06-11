import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import gameReducer from './services/game'
import { reducer as notificationsReducer } from 'reapop'
import logger from 'redux-logger'

const rootReducer = combineReducers({
  game: gameReducer,
  notifications: notificationsReducer(),
})

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    process.env.NODE_ENV !== 'production'
      ? getDefaultMiddleware().concat(logger)
      : getDefaultMiddleware(),
})
