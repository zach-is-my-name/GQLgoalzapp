import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/container/App';
import store from './store';
import {ApolloProvider, ApolloClient, createNetworkInterface } from 'react-apollo';
import './index.css';

const networkInterface = createNetworkInterface({
  uri: 'localhost:8080/graphql'
});

const client = new ApolloClient({
  networkInterface: networkInterface
});

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <App />
  </ApolloProvider>,
    document.getElementById('root')
);
