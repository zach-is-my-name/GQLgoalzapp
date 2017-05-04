import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {ApolloClient} from 'react-apollo';
import { reducer as formReducer } from 'redux-form'
import * as reducers from './Reducers/reducers';

const client = new ApolloClient();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  combineReducers ({
    goals:reducers.goalReducer,
    apollo:client.reducer(),
    form: formReducer
  }), {}, //initial state
composeEnhancers (
  applyMiddleware(client.middleware()),
  )
);
