import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import '../../App.css';
import { withRouter } from 'react-router-dom'
import UserFeed from '../../Routes/UserFeed'
import LoginAuth0 from '../LoginAuth0'

const clientId = 'x8qIN6200apx5f502AMPCnjNqtCZk4CA'
const domain = 'userzach.auth0.com'

export class App extends Component {
  // constructor(props) {
  //   super(props)
  // }

  _logout = () => {
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('auth0IdToken')
    location.reload()
  }

  _isLoggedIn = () => {
    return this.props.data.user
  }

  render() {
    const token = window.localStorage.getItem('auth0IdToken')
    console.log(token  ? 'LOCALSTORAGE === TRUE': 'LOCALSTORAGE === FALSE')
    if (this.props.data.error) {
    return console.error(this.props.data.error)
    }
    if (this.props.data.loading) {
      return (
        <div>Loading</div>
      )
    }
  console.log('USER QUERY:',this.props.data.user ? 'TRUE': 'FALSE')

    if (this._isLoggedIn()) {

    console.log('ISLOGGEDIN: TRUE')
      return this.renderLoggedIn()
    } else {
    console.log('_ISLOGGEDIN: FALSE')
      return this.renderLoggedOut()
    }
  }

  renderLoggedIn() {
    console.log('RENDERLOGGEDIN9()')
    return (
      <div className="App">
        <div>
          <h1>GoalZapp</h1>
          <br/>
          <button onClick={this._logout()}>
            logout
          </button>
          <UserFeed/>
        </div>
      </div>
        ) }

renderLoggedOut() {
  return(
      <div className="App">
        <h1>GoalZapp</h1>
        <br/>
        <LoginAuth0 clientId={clientId} domain={domain}/>
        <br/>
        <UserFeed/>
      </div>
    )}
        }

        const userQuery = gql`
          query userQuery {
            user {
              id
            }
          }
        `
export default graphql(userQuery, {options : {fetchPolicy: 'network-only'}})(withRouter(App))
