import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/container/App';
import {store} from './store';
import {ApolloProvider, ApolloClient} from 'react-apollo';
// import Authorization from './services/authorization'
import './index.css';
import {networkInterface} from './networkinterface'


export const client = new ApolloClient({
  networkInterface: networkInterface,
  connectToDevTools: true
});

// const auth = new Authroisation()

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <App />
  </ApolloProvider>,
    document.getElementById('root')
);
