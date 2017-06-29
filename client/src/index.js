import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/container/App';
import CreateUser from './components/User/CreateUser';
import {store} from './store';
import { BrowserRouter as Router, Route, Swtich } from 'react-router-dom'
import {ApolloProvider, ApolloClient} from 'react-apollo';
// import Authorization from './services/authorization'
import './index.css';
import {networkInterface} from './networkinterface'

// import GlobalFeed from './Routes/GlobalFeed'
import UserFeedPage from './Routes/UserFeedPage'
import NotFound from './Routes/NotFound'

export const client = new ApolloClient({
  networkInterface: networkInterface,
  connectToDevTools: true
});

// const auth = new Authroisation()

ReactDOM.render(
  <ApolloProvider store={store} client={client}>
    <Router>
      <div>
        <Route path='/' exact component={App} />
        <Route path='/signup' component={CreateUser} />
        <Route path='/userfeed' component={UserFeedPage} />
        {/* <Route component={NotFound} /> */}
      </div>
    </Router>

  </ApolloProvider>,
    document.getElementById('root')
);
