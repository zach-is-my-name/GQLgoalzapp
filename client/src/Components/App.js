/* eslint-disable */
import React, {Component} from 'react';
import {graphql, compose, withApollo} from 'react-apollo';
import gql from 'graphql-tag';
import '../style/App.css';
import '../style/fonts/bentonsans_regular-webfont.woff'
import '../style/fonts/bentonsans_light-webfont.woff'
import '../style/fonts/benton-italic.woff'
import '../style/fonts/nimbus_sans_becker_dcon_italic-webfont.woff'
import {withRouter, Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import {connect} from 'react-redux';
import UserFeedPage from '../Routes/UserFeedPage-smart'
import GlobalFeedPage from '../Routes/GlobalFeedPage'
import Login from './Login'
import CurrentUser from './User/CurrentUser'
import * as actions from '../Actions/actions'
import {Link} from 'react-router-dom';
import MenuButton from './User/MenuButton'

const clientId = 'x8qIN6200apx5f502AMPCnjNqtCZk4CA'
const domain = 'userzach.auth0.com'

export const userQuery = gql `
          query userQuery {
            user {
              id
              userName
            }
          }
        `
// const currentUserName = gql `
//           query($userId: ID) {
//             User (id: $userId){
//               userName
//             }
//           }`

export class App extends Component {

  /* Freecom method */
  // async componentDidMount() {
  //   const authToken = localStorage.getItem('auth0IdToken')
  //
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props !== nextProps && _isLoggedIn && window.localStorage.getItem('auth0IdToken')){
  //       this.props.dispatch(actions.setUserId(nextProps.data.user.id))
  //       this.props.dispatch(actions.setLoginStatus())
  //     }
  //   }




  render() {
    const auth0IdToken = window.localStorage.getItem('auth0IdToken')
    const graphcoolToken = window.localStorage.getItem('graphcoolToken')
    // console.log('id token', window.localStorage.getItem('auth0IdToken'))
    if (this.props.data.loading) {
      // console.log('returned loading')
      return <div>Loading...</div>

    } else if (auth0IdToken || graphcoolToken) {
        this.props.data.refetch()
        return this._renderApp()
      } else {
        // console.log('returned log-out / no token')
        return this.renderLoggedOut()
      }
    }

  _isLoggedIn = () => {
    return this.props.data.user
  }


_renderApp() {
      // console.log('returned render')
       return (
       <div className="App">
         <h1 className="logo">GoalZapp</h1>
         <div className="current-user">
           {/* <CurrentUser user={this.props.data.user ? this.props.data.user.username : 'anonymous'} /> */}
         </div>
         <MenuButton logout={this._logout} currentUser={this.props.data.user ? this.props.data.user.userName : 'anonymous' }/>
         <Switch>
           <Route exact  path='/userfeed/:userid/:goaldocid' component={UserFeedPage} />
           <Route exact  path='/userfeed/:userid' component={UserFeedPage} />
           <Route path='/userfeed/:userid' component={UserFeedPage} />
           <Route exact path='/userfeed' component={UserFeedPage} />
           <Route exact path="/" component={GlobalFeedPage}/>
           {/* <Route path='/signup' component={CreateUser} /> */}
         </Switch>
       </div>
     )

}

  renderLoggedOut() {
    // console.log('renderLoggedOut()')
    return (
      <div className="App">
        <h1>GoalZapp</h1>
        <br/>

        <div className="app-login-options">
          <Login clientId={clientId} domain={domain}/>
          <br/>
        </div>
      </div>
    )
  }

  _logout = () => {
    console.log('CLICKED LOGOUT')
    // remove token from local storage and reload page to reset apollo client
    window.localStorage.removeItem('auth0IdToken')
    window.localStorage.removeItem('graphcoolToken')
    console.log('Token Removed')
    location.reload()
  }

}

const WithQueries =
compose(graphql(userQuery, {
  options: {
    fetchPolicy: 'network-only'
  }
}))(withRouter(App))
// graphql(currentUserName, {
//   name:'currentUserName'
// }))(withRouter(App))

// const mapStateToProps = (state, props) => {
//   return {currentUser: state.goals.loggedInUserName}
// }
// export default connect(mapStateToProps)(WithQueries)
export default WithQueries
