/* eslint-disable */
import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import '../../style/App.css';
import {withRouter, Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import {connect} from 'react-redux';

import UserFeedPage from '../../Routes/UserFeedPage'
import GlobalFeedPage from '../../Routes/GlobalFeedPage'
import LoginAuth0 from '../LoginAuth0'
import CurrentUser from '../User/CurrentUser'
import * as actions from '../../Actions/actions'

const clientId = 'x8qIN6200apx5f502AMPCnjNqtCZk4CA'
const domain = 'userzach.auth0.com'

export class App extends Component {

  _logout = () => {
    console.log('CLICKED LOGOUT')
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('auth0IdToken')
    console.log('Token Removed')
    location.reload()
  }

  _isLoggedIn = () => {
    // console.log('this.props.data', this.props.data)
    return this.props.data.user
  }


  render() {
    if (this.props.data.error) {
      return console.error(this.props.data.error)
    }
    if (this.props.data.loading) {
      return  <div>Loading</div>
    }
      /*Check User Query */
    if (window.localStorage.getItem('auth0IdToken') && this._isLoggedIn()) {
      this.props.dispatch(actions.setLoginStatus())
      this.props.dispatch(actions.setUserId(this.props.data.user.id))
      return this.renderLoggedIn()
    }
      return (
          this.renderLoggedOut()
          )
  }

  renderLoggedIn() {
    const {match} = this.props;
    console.log('renderLoggedIn()')
    // console.log(match)
    return (
      <div className="App">
        <div className="user-top-right-wrapper">
          <div className="current-user">
            <CurrentUser  user={this.props.data.user.userName} />
          </div>
          <button className="logout-button" onClick={this._logout}>
            logout
          </button>
        </div>
        <h1>GoalZapp</h1>
        <Switch>
          <Route path="/userfeed/:userid" component={UserFeedPage} />
          <Route exact path="/" component={GlobalFeedPage}  />
        </Switch>

      </div>
          )
          }

  renderLoggedOut() {
    console.log('renderLoggedOut()')
    return (
      <div className="App">
        <h1>GoalZapp</h1>
        <br/>

        <LoginAuth0 clientId={clientId} domain={domain}/>
        <br/>
        {/* <UserFeed/> */}
      </div>
    )
  }
}

const userQuery = gql `
          query userQuery {
            user {
              id
              userName
            }
          }
        `

const WithQuery = graphql(userQuery, {
  options: {
    fetchPolicy: 'network-only'
  }
})(withRouter(App))

export default connect()(WithQuery)
