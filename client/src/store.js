import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {ApolloClient} from 'react-apollo';
import { reducer as formReducer } from 'redux-form'
// import { client } from './index'

import * as Goal_Reducer from './Reducers/Goal_Reducer';

const client = new ApolloClient();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  combineReducers ({
    goals:Goal_Reducer.goalReducer,
    apollo:client.reducer(),
    form: formReducer
  }), {}, //initial state
composeEnhancers (
  applyMiddleware(client.middleware()),
  )
);
