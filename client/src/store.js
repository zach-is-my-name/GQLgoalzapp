import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import { createLogger } from 'redux-logger'
import { reducer as formReducer } from 'redux-form'
// import { client } from './index'
import thunk from 'redux-thunk'
import * as Goal_Reducer from './Reducers/Global_Reducer';

const logger = createLogger({
 collapsed: (getState, action, logEntry) => !logEntry.error,
 predicate:(getState, action) => !action.type.includes('@@redux-form')
})


const composeEnhancers = typeof window === 'object' &&  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: compose;
/* eslint-disable no-underscore-dangle */
export const store = createStore(
  combineReducers ({
    goals:Goal_Reducer.goalReducer,
    form: formReducer
  })
 /* eslint-enable */
  , {}, //initial state
composeEnhancers (
  applyMiddleware(thunk, logger)

  )
);
