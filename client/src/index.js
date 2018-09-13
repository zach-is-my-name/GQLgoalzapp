/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/Container/App';
import CreateUser from './Components/User/CreateUser';
import {store} from './store';
import {Provider} from 'react-redux'
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
import UserFeedPage from './Routes/UserFeedPage'
import NotFound from './Routes/NotFound'

console.log(link)

const cache = new InMemoryCache()

const client = new ApolloClient({
  link,
  cache: cache.restore(window.__APOLLO_CLIENT__),
  connectToDevTools: true
});

// const auth = new Authroisation()

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider  client={client}>
      <Router>
        <div>
          <Route  path='/' component={App} />
          {/* <Route path='/userfeed/:userid' component={UserFeedPage} /> */}
          <Route path='/signup' component={CreateUser} />
          {/* <Route exact path='/userfeed' component={UserFeedPage} /> */}
          {/* <Route  path='/userfeed/:userid' component={UserFeedPage} /> */}
          {/* <Route component={NotFound} /> */}
        </div>
      </Router>
    </ApolloProvider>
  </Provider>,
    document.getElementById('root')
);
