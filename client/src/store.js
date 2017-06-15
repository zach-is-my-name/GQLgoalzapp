import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {ApolloClient} from 'react-apollo';
import { createLogger } from 'redux-logger'
import { reducer as formReducer } from 'redux-form'
// import { client } from './index'

import * as Goal_Reducer from './Reducers/Goal_Reducer';

const logger = createLogger({
 collapsed: (getState, action, logEntry) => !logEntry.error,
 predicate:(getState, action) => action.type !== 'action.redux-form/REGISTER_FIELD' || 'action.redux-form/FOCUS' || '@@redux-form/BLUR'
})

const client = new ApolloClient();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  combineReducers ({
    goals:Goal_Reducer.goalReducer,
    apollo:client.reducer(),
    form: formReducer
  }), {}, //initial state
composeEnhancers (
  applyMiddleware(client.middleware(),logger),

  )
);
