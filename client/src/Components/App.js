/* eslint-disable */
import React, {Component} from 'react';
import {compose, withApollo} from 'react-apollo';
import gql from 'graphql-tag';
import '../style/App.css';
import '../style/fonts/bentonsans_regular-webfont.woff'
import '../style/fonts/bentonsans_light-webfont.woff'
import '../style/fonts/benton-italic.woff'
import '../style/fonts/nimbus_sans_becker_dcon_italic-webfont.woff'
import {withRouter, Switch, Route, BrowserRouter as Router, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import WelcomePage from '../Routes/WelcomePage'
import UserFeedPage from '../Routes/UserFeedPage-smart'
import GlobalFeedPage from '../Routes/GlobalFeedPage'
import decode from 'jwt-decode';
import CurrentUser from './User/CurrentUser'
import * as actions from '../Actions/actions'
import {Link} from 'react-router-dom';
import MenuButton from './User/MenuButton'
import FundGoalButton from './Ethereum/FundGoalButton'
import TokensMenuButton from './Ethereum/TokensMenuButton'
import AuthButton from './Auth/AuthButton'
import {AuthContainer} from './Auth/AuthContainer'
import {CallbackContainer} from './Auth/CallbackContainer'
import {ProtectedRoute} from '../Routes/ProtectedRoute'
import ContractRewardsFunds from './Ethereum/ContractRewardsFund-Smart'
import BondRewardsFunds from './Ethereum/BondRewardsFund-Smart'
import UserTokenFunds from './Ethereum/UserTokenFunds'
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
import goalzapptokensystem from '../abi/GoalZappTokenSystem.json'
import * as DeployedAddress from '../ContractAddress.js'
import detectEthereumProvider from '@metamask/detect-provider'
const workspaceEndpoint = process.env.REACT_APP_WORKSPACE_ENDPOINT;
const clientId = 'x8qIN6200apx5f502AMPCnjNqtCZk4CA'
const domain = 'userzach.auth0.com'
let auth0IdToken
let graphcoolToken
const GoalZappTokenSystem = new web3.eth.Contract(goalzapptokensystem.abi, DeployedAddress.GOALZAPPTOKENSYSTEM )

export const userQuery = gql `
          query userQuery {
            user {
              id
              userName
            }
          }
        `
export class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.setProxyAddress = this.setProxyAddress.bind(this)
    this.renderFundGoal = this.renderFundGoal.bind(this)
    this.setUrlHasGoalDoc = this.setUrlHasGoalDoc.bind(this)
    this.setUrlDoesNotHaveGoalDoc = this.setUrlDoesNotHaveGoalDoc.bind(this)
    this.setRewardsAmount = this.setRewardsAmount.bind(this)
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this)
    this.setBondsAmount = this.setBondsAmount.bind(this)
    this.setUserTokenBalance = this.setUserTokenBalance.bind(this)
    //this._renderApp = this._renderApp.bind(this)
    this.state = {
      proxyAddress: "",
      urlHasGoalDoc: false,
      renderFundGoal: false,
      rewardsAmount: null,
      bondsAmount: null,
      userTokenBalance: null,
      hasProvider: false,
      currentAccount: "",
      loggedInUserId: "",
      loggedInUserName:""
    }
  }
    async handleAccountsChanged  (accounts) {
      if (accounts.length === 0) {
        console.log('Please connect to MetaMask.');
      } else if (accounts[0] !== this.state.currentAccount) {
          this.setState({currentAccount: accounts[0]})
        }
      }

  async componentDidMount() {
    // try {
    const userQueryResult = await this.props.client.query({query: userQuery , fetchPolicy: 'network-only', errorPolicy: 'all'})
    console.log('userQueryResult' , userQueryResult )
  // } catch (error) {console.log(error)}
    if (userQueryResult.data.user && !this.state.loggedInUserId) {
    this.setState({loggedInUserId: userQueryResult.data.user.id, loggedInUserName: userQueryResult.data.user.userName || ''})
  }
    const provider = await detectEthereumProvider();

      window.ethereum
        .request({ method: 'eth_accounts' })
        .then(this.handleAccountsChanged)
        .catch(err =>  console.error(err))



    if (this.state.currentAccount) {
      const tokenBalance = web3.utils.fromWei((await GoalZappTokenSystem.methods.balanceOf(this.state.currentAccount).call()))
      this.setState(({userTokenBalance: tokenBalance}))
    }

      window.ethereum.on('accountsChanged', this.handleAccountsChanged);
      this.setState({hasProvider: true})

  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      const provider = await detectEthereumProvider();
      async function handleAccountsChanged  (accounts) {
        console.log('state',this.state)
        if (accounts.length === 0) {
          console.log('Please connect to MetaMask.');
        } else if (accounts[0] !== this.state.currentAccount) {
            this.setState({currentAccount: accounts[0]})
        }
      }

      if (provider) {
        window.ethereum
          .request({ method: 'eth_accounts' })
          .then(this.handleAccountsChanged)
          .catch((err) => {
            console.error(err);
          })
          this.setState({hasProvider: true})
        } else {
          this.setState({hasProvider: false})
          alert('Please install MetaMask!');
       }
    }
    if (this.state.currentAccount !== prevState.currentAccount) {
      const tokenBalance = web3.utils.fromWei((await GoalZappTokenSystem.methods.balanceOf(this.state.currentAccount).call()))
      this.setState(({userTokenBalance: tokenBalance}))
    }
  }

  render() {
    if (!this.state.loggedInUserId) {
    this.getUser()
  }
    window.ethereum.on('accountsChanged', this.handleAccountsChanged);
  //   if (!this.state.loggedInUserId) {
  //    return <div> Loading... < /div>
  // }
  // else if (this.state.loggedInUserId) {
      return this._renderApp()
   // }
   // return null
 }

  _renderApp = () => {
    return (

      <div className = "App" >
      <Link to = "/" > <h1 className = "logo" > GoalZapp </h1> </Link>

      { this.state.loggedInUserId ?
      <MenuButton
      currentUser={this.state.loggedInUserName ? this.state.loggedInUserName : 'anonymous'}
      currentUserId={this.state.loggedInUserId}
      />  : null
      }

    <UserTokenFunds userTokenBalance = {this.state.userTokenBalance} / >

    {this.state.proxyAddress ?
        <ContractRewardsFunds
          setRewardsAmount = {this.setRewardsAmount}
          rewardsAmount = {this.state.rewardsAmount}
          proxyAddress = {this.state.proxyAddress}
        />
          : null}

      {this.state.proxyAddress ?
        <BondRewardsFunds
          setBondsAmount = {this.setBondsAmount}
          bondsAmount = {this.state.bondsAmount}
          proxyAddress = {this.state.proxyAddress}
        />
          : null }

      {this.state.renderFundGoal &&  this.state.proxyAddress && this.state.urlHasGoalDoc ?
        <FundGoalButton
          userTokenBalance = {this.state.userTokenBalance}
          setUserTokenBalance = {this.setUserTokenBalance}
          setRewardsAmount = {this.setRewardsAmount}
          setBondsAmount = {this.setBondsAmount}
          currentEthereumAccount = {this.state.currentAccount}
          proxyAddress = {this.state.proxyAddress}
        />
          : null}

      <TokensMenuButton
        userTokenBalance = {this.state.userTokenBalance}
        setUserTokenBalance = {this.setUserTokenBalance}
       />
      <Switch>
      <Route exact path="/auth/" component={AuthContainer} />
      <Route path="/auth/callback" component={CallbackContainer} />

      <ProtectedRoute exact path = '/userfeed/:userid/:goaldocid' render = {
        (props) => {
          return <UserFeedPage
            rewardsAmount = {this.state.rewardsAmount}
            setRewardsAmount = {this.setRewardsAmount}
            setBondsAmount = {this.setBondsAmount}
            setUserTokenBalance = {this.setUserTokenBalance}
            userTokenBalance = {this.state.userTokenBalance}
            renderFundGoal= {this.renderFundGoal}
            setUrlHasGoalDoc = {this.setUrlHasGoalDoc}
            setUrlDoesNotHaveGoalDoc = {this.setUrlDoesNotHaveGoalDoc}
            setProxyAddress = {this.setProxyAddress}
            {...props}
            {...this.props}
            proxyAddress = {this.state.proxyAddress}
            currentEthereumAccount={this.state.currentAccount}
            loggedInUserId = {this.state.loggedInUserId}
            loggedInUserName ={this.state.loggedInUserName}
            />
          }
      }/>

      <ProtectedRoute exact path = '/userfeed/:userid' render = {
        ( props) => {
          return <UserFeedPage
            rewardsAmount = {this.state.rewardsAmount}
            setRewardsAmount = {this.setRewardsAmount}
            setBondsAmount = {this.setBondsAmount}
            setUserTokenBalance = {this.setUserTokenBalance}
            userTokenBalance = {this.state.userTokenBalance}
            setUrlHasGoalDoc = {this.setUrlHasGoalDoc}
            setUrlDoesNotHaveGoalDoc = {this.setUrlDoesNotHaveGoalDoc}
            renderFundGoal= {this.renderFundGoal}
            setProxyAddress = {this.setProxyAddress}
            {...props}
            {...this.props}
            proxyAddress = {this.state.proxyAddress}
            urlHasGoalDoc = {this.state.urlHasGoalDoc}
            currentEthereumAccount={this.state.currentAccount}
            loggedInUserId = {this.state.loggedInUserId}
            loggedInUserName ={this.state.loggedInUserName}
        />
      }
      }/>


      <ProtectedRoute exact path= '/globalfeed' render= {(props) => {
        return <GlobalFeedPage
          rewardsAmount = {this.state.rewardsAmount}
          setRewardsAmount = {this.setRewardsAmount}
          setBondsAmount = {this.setBondsAmount}
          userTokenBalance = {this.state.userTokenBalance}
          proxyAddress = {this.state.proxyAddress}
          loggedInUserId = {this.state.loggedInUserId}
          loggedInUserName ={this.state.loggedInUserName}
        />
      }
      }/>


      <Route exact path= "/" render={(props) =>
        <WelcomePage />
      } />

      <ProtectedRoute path= '*'>
        <Redirect to='/globalfeed' />
      </ProtectedRoute>

      <Route path='*'>
        <WelcomePage />
      </Route>

          </Switch>
</div>
    )

}



  setProxyAddress(address) {
    this.setState({proxyAddress: address})
  }

  setUrlHasGoalDoc() {
    //console.log('setUrlHasGoalDoc called')
    this.setState(({urlHasGoalDoc: true}))
  }

  setUrlDoesNotHaveGoalDoc() {this.setState(({urlHasGoalDoc: false}))}

  setRewardsAmount(rewardsAmount) {this.setState({rewardsAmount})}

  setBondsAmount(bondsAmount) {this.setState({bondsAmount})}

  setUserTokenBalance(userTokenBalance) {
    this.setState({userTokenBalance})
  }

  renderFundGoal(targetUserId) {
    this.setState({renderFundGoal: true})
  }

   getUser = async () => {
    const userQueryResult = await this.props.client.query({query: userQuery , fetchPolicy: 'network-only', errorPolicy: 'all'})
    if (userQueryResult.data.user) {
      this.setState({loggedInUserId: userQueryResult.data.user.id, loggedInUserName: userQueryResult.data.user.userName})
    }
  }

  }

  const exportApp = compose(withRouter, withApollo)(App)



  export default exportApp
