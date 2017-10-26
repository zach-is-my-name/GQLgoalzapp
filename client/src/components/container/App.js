/* eslint-disable */
import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import '../../style/App.css';
import '../../style/fonts/bentonsans_regular-webfont.woff'
import {withRouter, Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import {connect} from 'react-redux';

import UserFeedPage from '../../Routes/UserFeedPage'
import GlobalFeedPage from '../../Routes/GlobalFeedPage'
import LoginAuth0 from '../LoginAuth0'
import CurrentUser from '../User/CurrentUser'
import * as actions from '../../Actions/actions'
import {Link} from 'react-router-dom';
import MenuButton from '../User/MenuButton'

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
    // console.log('this.props.userQuery', this.props.userQuery)
    return this.props.userQuery.user
  }

  dispatchUserIdCallback() {
      this.props.dispatch(actions.setUserId(this.props.userQuery.user.id))
  }

  dispatchLoginStatusCallback() {
      this.props.dispatch(actions.setLoginStatus())
}

componentWillReceiveProps(nextProps) {
  if (this.props !== nextProps)
      if (nextProps.userQuery.error) {
      return console.error(this.props.userQuery.error)
    }
    if (nextProps.userQuery.loading) {
      return  <div>Loading</div>
    }
      /*Check User Query */
    if (window.localStorage.getItem('auth0IdToken') && this._isLoggedIn()) {
      /*use callback to avoid warning*/
      this.dispatchLoginStatusCallback()
      this.dispatchUserIdCallback()

      // this.props.dispatch(actions.setUserId(this.props.userQuery.user.id))
      return this.renderLoggedIn()
    }
      return (
          this.renderLoggedOut()
          )
          console.log('componentWillMount App', nextProps.userQuery.user)
}

  render() {
    if (this.props.userQuery.error) {
      return console.error(this.props.userQuery.error)
    }
    if (this.props.userQuery.loading) {
      return  <div>Loading</div>
    }
      /*Check User Query */
    if (window.localStorage.getItem('auth0IdToken') && this._isLoggedIn()) {
      /*use callback to avoid warning*/
      this.dispatchLoginStatusCallback()
      this.dispatchUserIdCallback()

      // this.props.dispatch(actions.setUserId(this.props.userQuery.user.id))
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
        <h1 className="logo">GoalZapp</h1>
        <div className="current-user">
          <CurrentUser  user={this.props.userQuery.user.userName} />
        </div>
        <MenuButton logout={this._logout} currentUser={this.props.currentUser}  />
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

const CurrentUserName = gql `
query($userId: ID) {
  User (id: $userId)
  {userName
  }
}
`;

const WithQueries = (graphql(userQuery, {
name: 'userQuery',
  options: {
    fetchPolicy: 'network-only',
  }
}))(withRouter(App))


const mapStateToProps = (state,props) => {
  return {
    currentUser: state.goals.loggedInUserName,
  }
}


export default connect(mapStateToProps)(WithQueries)
