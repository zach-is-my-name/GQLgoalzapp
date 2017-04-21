import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/container/App';
// import store from './store';
import {ApolloProvider, ApolloClient, createNetworkInterface} from 'react-apollo';
import './index.css';

const networkInterface = createNetworkInterface({
  uri: '/graphql'
});

const client = new ApolloClient({
  networkInterface: networkInterface,
  connectToDevTools: true
});

ReactDOM.render(
  <ApolloProvider  client={client}>
    <App />
  </ApolloProvider>,
    document.getElementById('root')
);
