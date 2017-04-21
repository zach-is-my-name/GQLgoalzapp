import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {ApolloClient, ApolloProvider} from 'react-apollo';
import * as reducers from './Reducers/reducers';

const client = new ApolloClient();

const store = createStore(
  combineReducers ({
    // goals:reducers.goalReducer,
    apollo: client.reducer(),
  }), {}, //initial state
compose (
  applyMiddleware(client.middleware()),
  )
);

export default store;
