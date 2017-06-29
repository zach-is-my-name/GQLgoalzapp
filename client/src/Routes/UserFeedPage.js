import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom';

import Goal from '../components/container/Goal.js'
import Steps from '../components/container/Steps.js'
import App from '../components/container/App'
// import GlobalFeedPage from './Routes/GlobalFeedPage'

export default class UserFeedPage extends Component {
  render() {
    return (

  <div>
    <Goal />
    <Steps />
    <Link to="/">
      GlobalFeed
    </Link>
  </div>
)
  }
  }
