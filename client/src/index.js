/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import CreateUserAuth0 from './Components/User/CreateUserAuth0';
import {store} from './store';
import { AppProvider } from '@8base/react-sdk';
import AuthClient from './Components/Auth/AuthClient.js';
import { BrowserRouter as Router, Route, Swtich } from 'react-router-dom'
// import {ApolloProvider, ApolloClient} from 'react-apollo';
import {ApolloProvider} from 'react-apollo';
import {ApolloClient} from 'apollo-client'
import {link} from './networkinterface'
import {InMemoryCache} from 'apollo-cache-inmemory'
// import Authorization from './services/authorization'
import './index.css';
// import {networkInterface} from './networkinterface'

// import GlobalFeed from './Routes/GlobalFeed'
import UserFeedPage from './Routes/UserFeedPage-smart'
import NotFound from './Routes/NotFound'


const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache: cache.restore(window.__APOLLO_CLIENT__),
  connectToDevTools: true
});

// const auth = new Authroisation()
ReactDOM.render(
    <ApolloProvider  client={client}>
        <AppProvider
          uri={"https://api.8base.com/ckbx087zh000207ms3ink870q"}
          authClient={AuthClient}
        >
      <Router>
          <div>
            <Route  path='/' component={App} />
            {/* <Route component={NotFound} /> */}
          </div>
      </Router>
    </ AppProvider>
    </ ApolloProvider>,
    document.getElementById('root')
);
