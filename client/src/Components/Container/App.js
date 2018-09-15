/* eslint-disable */
import React, {Component} from 'react';
import {graphql,compose} from 'react-apollo';
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

const userQuery = gql `
          query userQuery {
            user {
              id
              userName
            }
          }
        `
export class App extends Component {

/*Freecom method*/
// async componentDidMount() {
//   const authToken = localStorage.getItem('auth0IdToken')
//
// }

componentWillReceiveProps(nextProps) {
  if (this.props !== nextProps && nextProps.data.user && window.localStorage.getItem('auth0IdToken')){
      this.props.dispatch(actions.setUserId(nextProps.data.user.id))
      this.props.dispatch(actions.setLoginStatus())
    }
  }

  render() {
    const {match} = this.props;
    if(this.props.data.loading){
      return <div>Loading...</div>
    }
    if (this.props.data && !this.props.data.loading && this.props.data.user) {
      if(this.props.data.user) {
      return (<div className="App">
        {console.log('renderLoggedIn()')}
        <h1 className="logo">GoalZapp</h1>
        <div className="current-user">
          <CurrentUser  user={this.props.data.user.userName} />
        </div>
        <MenuButton logout={this._logout} currentUser={this.props.currentUser}  />
        <Switch>
          <Route path="/userfeed/:userid" component={UserFeedPage} />
          <Route exact path="/" component={GlobalFeedPage}  />
        </Switch>
      </div>)
  }
}
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
_logout = () => {
  console.log('CLICKED LOGOUT')
  // remove token from local storage and reload page to reset apollo client
  window.localStorage.removeItem('auth0IdToken')
  console.log('Token Removed')
  location.reload()
}



// const currentUserName = gql `
// query($userId: ID) {
//   User (id: $userId){
//     userName
//   }
// }
// `;

const WithQueries = compose(graphql(userQuery, {
  // name: 'userQuery',
  options: {
    fetchPolicy: 'network-only'
  }
}

),
// graphql(currentUserName, {
//   name:'currentUserName'
// })
)
(withRouter(App))


const mapStateToProps = (state,props) => {
  return {
    currentUser: state.goals.loggedInUserName,
  }
}


export default connect(mapStateToProps)(WithQueries)
