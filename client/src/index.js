import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/container/App';
import {store} from './store';
import {ApolloProvider, ApolloClient, createNetworkInterface} from 'react-apollo';
import './index.css';


const client = new ApolloClient({
  networkInterface: createNetworkInterface({
  uri:"/graphql",
}),
  connectToDevTools: true
});

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <App />
  </ApolloProvider>,
    document.getElementById('root')
);
