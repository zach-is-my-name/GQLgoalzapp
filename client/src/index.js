import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/container/App';
import store from './store';
import {ApolloProvider, ApolloClient} from 'react-apollo';
import './index.css';

const client = new ApolloClient();

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <App />
  </ApolloProvider>,
    document.getElementById('root')
);
