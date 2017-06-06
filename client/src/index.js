import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/container/App';
import {store} from './store';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {ApolloProvider, ApolloClient} from 'react-apollo';
// import Authorization from './services/authorization'
import './index.css';
import {networkInterface} from './networkinterface'

// import GlobalFeed from './Routes/GlobalFeed'
// import UserFeed from './Routes/UserFeed'

export const client = new ApolloClient({
  networkInterface: networkInterface,
  connectToDevTools: true
});

// const auth = new Authroisation()

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Router>
      <Route exact path='/' component={App} />
      {/* <Route path='/user' component={App} /> */}
    </Router>
    </ApolloProvider>,
    document.getElementById('root')
);
