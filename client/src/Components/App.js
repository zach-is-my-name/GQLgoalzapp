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
import FundGoalButton from './Ethereum/FundGoalButton'
import TokensMenuButton from './Ethereum/TokensMenuButton'
import ContractRewardsFund from './Ethereum/ContractRewardsFund-Smart'
import BondRewardsFund from './Ethereum/BondRewardsFund-Smart'
var Web3 = require('web3');
import { Web3Provider } from 'react-web3';

if (typeof window.ethereum !== 'undefined'|| (typeof window.web3 !== 'undefined')) {
  // Web3 browser user detected. You can now use the provider.
  const provider = window['ethereum'] || window.web3.currentProvider
}

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
  constructor(props) {
    super(props)
    this._attemptLogin = this._attemptLogin.bind(this)
    this.setProxyAddress = this.setProxyAddress.bind(this)
    this.setUrlHasGoalDoc = this.setUrlHasGoalDoc.bind(this)
    this.setUrlDoesNotHaveGoalDoc = this.setUrlDoesNotHaveGoalDoc.bind(this)
  // this._renderApp = this._renderApp.bind(this)
    this.state = {
      proxyAddress: "",
      urlHasGoalDoc: false,
    }
  }

  render() {
    const auth0IdToken = window.localStorage.getItem('auth0IdToken')
    const graphcoolToken = window.localStorage.getItem('graphcoolToken')

    if (this.props.data.loading) {
      return <div>Loading...</div>

    } else if (auth0IdToken || graphcoolToken) {
        // console.log('attempt login')
        return this._attemptLogin()
    //    return  this._attemptLogin()
      } else {
        console.log('top else render logged out')
        return this.renderLoggedOut()
      }
  }

  _isLoggedIn = () => {
    return this.props.data.user
  }

 _attemptLogin() {
    this.props.data.refetch()
    if (!this.props.data.loading && this.props.data.user && this.props.data.user.userName) {
      // console.log(this.props.data.user.userName)
      // console.log('render app')
      return  this._renderApp()
    }  else {
      console.log('second level else | render logged out')
      return this.renderLoggedOut()
    }
  }

_renderApp = () => {

      return (
         <Web3Provider>
       <div className="App">
         <h1 className="logo">GoalZapp</h1>
         <div className="current-user">
           {/* <CurrentUser user={this.props.data.user ? this.props.data.user.username : 'anonymous'} /> */}
         </div>
         <MenuButton
         logout={this._logout}
         currentUser={this.props.data.user ? this.props.data.user.userName : 'anonymous' }
         currentUserId={this.props.data.user.id}
         />
        {this.state.proxyAddress ? <ContractRewardsFund proxyAddress={this.state.proxyAddress} /> : null }
        {this.state.proxyAddress ? <BondRewardsFund proxyAddress={this.state.proxyAddress} /> : null }
         <TokensMenuButton />
        {this.state.proxyAddress && this.state.urlHasGoalDoc ? <FundGoalButton selectedAccount={window.ethereum.selectedAddress} proxyAddress={this.state.proxyAddress} /> : null }

         <Switch>
           <Route exact path='/userfeed/:userid/:goaldocid' render={(props)  => <UserFeedPage setUrlHasGoalDoc={this.setUrlHasGoalDoc} setUrlDoesNotHaveGoalDoc={this.setUrlDoesNotHaveGoalDoc} setUrlDoesNotHaveGoalDoc setProxyAddress={this.setProxyAddress} {...props} proxyAddress={this.state.proxyAddress} />} />
           <Route exact path='/userfeed/:userid' render={(props)  =>
             <UserFeedPage setUrlHasGoalDoc={this.setUrlHasGoalDoc} setUrlDoesNotHaveGoalDoc={this.setUrlDoesNotHaveGoalDoc} setProxyAddress={this.setProxyAddress} {...props} proxyAddress={this.state.proxyAddress} urlHasGoalDoc={this.state.urlHasGoalDoc}  /> } />
           <Route path='/userfeed/:userid' render={(props)  =>
             <UserFeedPage setUrlHasGoalDoc={this.setUrlHasGoalDoc} setUrlDoesNotHaveGoalDoc={this.setUrlDoesNotHaveGoalDoc} setProxyAddress={this.setProxyAddress} {...props}  proxyAddress={this.state.proxyAddress} />} />
           <Route exact path='/userfeed' render={(props)  =>
             <UserFeedPage setUrlHasGoalDoc={this.setUrlHasGoalDoc} setUrlDoesNotHaveGoalDoc={this.setUrlDoesNotHaveGoalDoc} setProxyAddress={this.setProxyAddress} {...props}  proxyAddress={this.state.proxyAddress} />} />
           <Route exact path="/"  render= {() => <GlobalFeedPage />}     />
         </ Switch>
       </div>
           </Web3Provider>
           /* <Route path='/signup' component={CreateUser} /> */

     )
}

  renderLoggedOut = () => {
    console.log('renderLoggedOut()')
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
    this.props.history.push('/')
    // location.reload()
  }

  setProxyAddress(address) {
    this.setState({proxyAddress: address})
  }

  setUrlHasGoalDoc() {
    console.log('setUrlHasGoalDoc called')
    this.setState( ({urlHasGoalDoc: true}))
  }
  setUrlDoesNotHaveGoalDoc() {
    this.setState(({urlHasGoalDoc: false}))
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
