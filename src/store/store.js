import {  createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { combineReducer } from './combineReducer'



export const store = createStore(
    combineReducer,
    applyMiddleware(thunkMiddleware)
  )