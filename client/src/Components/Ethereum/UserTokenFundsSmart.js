import React from 'react';
import * as DeployedAddress from '../../ContractAddress.js'
import goalzapptokensystem from '../../abi/GoalZappTokenSystem.json'
import UserTokenFunds from './UserTokenFunds'
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

if (typeof window.ethereum !== 'undefined'|| (typeof window.web3 !== 'undefined')) {
  // Web3 browser user detected. You can now use the provider.
  const provider = window['ethereum'] || window.web3.currentProvider
}
const GoalZappTokenSystem = new web3.eth.Contract(goalzapptokensystem.abi, DeployedAddress.GOALZAPPTOKENSYSTEM )

class UserTokenFundsSmart extends React.Component {
  constructor(props) {
  super(props)
  this.state = {userTokenBalance: null}
  }

  async componentDidMount() {
    if (!window.ethereum.selectedAddress) {
      alert('Log into metamask to continue')
      try {
        await window.ethereum.enable()
      }
      catch (error) {
        console.log(error)
      }
    }
    //tokenBalance = web3.utils.fromWei(tokenBalance)
    let tokenBalance = await GoalZappTokenSystem.methods.balanceOf((window.ethereum.selectedAddress)).call()
    this.props.setUserTokenBalance(tokenBalance)
  }

  componentDidUpdate(prevProps) {
    //if (this.props.userTokenBalance !== prevProps.userTokenBalance) {
      //let tokenBalance = await GoalZappTokenSystem.methods.balanceOf(window.ethereum.selectedAddress).call()
      //this.props.setUserTokenBalance(this.props.tokenBalance)
    //}
  }

  render() {
    return <UserTokenFunds tokenBalance={this.props.userTokenBalance} />

  }
}

export default UserTokenFundsSmart
