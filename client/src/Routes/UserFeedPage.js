/* eslint-disable */
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom';

import Goal from '../components/container/Goal.js'
import Steps from '../components/container/Steps.js'
import App from '../components/container/App'
import CurrentUser from '../components/User/CurrentUser'
import GlobalFeedPage from './GlobalFeedPage'

export default class UserFeedPage extends Component {
  render() {
  const {match} = this.props;
    // console.log('UserFeedPage props',this.props)
    return (

  <div className="UserFeedPage">
    <h4> UserFeed </h4>
    <Goal   />
    <Steps  />
    {/* <Route exact path={`${match.url}/userfeed/:userid`} component={UserFeedPage} /> */}
    <Link to="/">
      GlobalFeed
    </Link>
  </div>
)
  }
  }
