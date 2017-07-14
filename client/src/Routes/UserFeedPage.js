/* eslint-disable */
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../Actions/actions'

import Goal from '../components/container/Goal.js'
import Steps from '../components/container/Steps.js'
import App from '../components/container/App'
import CurrentUser from '../components/User/CurrentUser'
import GlobalFeedPage from './GlobalFeedPage'

 class UserFeedPage extends Component {
  render() {
  const {match} = this.props;
    // console.log('UserFeedPage props',match)
  this.props.dispatch(actions.setTargetUser(match.params.userid))
    return (

  <div className="UserFeedPage">
    <h4> UserFeed </h4>
    <Goal  />
    <Steps  />
    {/* <Route exact path={`${match.url}/userfeed/:userid`} component={UserFeedPage} /> */}
    <Link to="/">
      GlobalFeed
    </Link>
  </div>
)
  }
  }


const ConnectedUserFeedPage = connect()(UserFeedPage)
export default ConnectedUserFeedPage
