import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import '../../App.css';
import {withRouter} from 'react-router-dom'
import UserFeed from '../../Routes/UserFeed'
import LoginAuth0 from '../LoginAuth0'
import {connect} from 'react-redux';
import * as actions from '../../Actions/actions'

const clientId = 'x8qIN6200apx5f502AMPCnjNqtCZk4CA'
const domain = 'userzach.auth0.com'

export class App extends Component {

  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('auth0IdToken')
    location.reload()
  }

  _isLoggedIn = () => {
    return this.props.data.user
  }

  render() {
    // console.log(token  ? 'LOCALSTORAGE === TRUE': 'LOCALSTORAGE === FALSE')
    console.log(this.props)
    if (this.props.data.error) {
      return console.error(this.props.data.error)
    }
    if (this.props.data.loading) {
      return (
        <div>Loading</div>
      )
    }

    if (this._isLoggedIn()) {
      this.props.dispatch(actions.setUserId(this.props.data.user.id))
      console.log('ISLOGGEDIN: TRUE')
      return this.renderLoggedIn()
    } else {
      console.log('_ISLOGGEDIN: FALSE')
      return this.renderLoggedOut()
    }
  }


/*If they have a token but this.props.data.user.id === false, run CreateUser */

// user already logged in
  // if (!this.props.data.user) {
  //   console.log('no user data')
  //   const token = window.localStorage.getItem('auth0IdToken')
  //   console.log(typeof token)
  //   console.log('TOKEN', token)
  // }

  renderLoggedIn() {
    console.log('RENDERLOGGEDIN9()')
    return (
      <div className="App">
        <div>
          <h1>GoalZapp</h1>
          <br/>
          <button onClick={this._logout}>
            logout
          </button>
          <UserFeed/>
        </div>
      </div>
    )
  }

  renderLoggedOut() {
    return (
      <div className="App">
        <h1>GoalZapp</h1>
        <br/>
        <LoginAuth0 clientId={clientId} domain={domain}/>
        <br/>
        <UserFeed/>
      </div>
    )
  }
}

const userQuery = gql `
          query userQuery {
            user {
              id
            }
          }
        `

const WithQuery = graphql(userQuery, {
  options: {
    fetchPolicy: 'network-only'
  }
})(withRouter(App))

export default connect()(WithQuery)
