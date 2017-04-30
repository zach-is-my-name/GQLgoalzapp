import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {ApolloClient} from 'react-apollo';
import * as reducers from './Reducers/reducers';

const client = new ApolloClient();

export const store = createStore(
  combineReducers ({
    goals:reducers.goalReducer,
    apollo:client.reducer(),
  }), {}, //initial state
compose (
  applyMiddleware(client.middleware()),
  )
);
