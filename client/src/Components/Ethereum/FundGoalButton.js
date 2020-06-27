import React from 'react'
import { Wrapper, Button, Menu, MenuItem } from 'react-aria-menubutton';
import '../../style/FundGoalButton.css'
import goalzapptokensystem from '../../abi/GoalZappTokenSystem.json'
import goalescrow from '../../abi/GoalEscrowTestVersion.json'
import * as DeployedAddress from '../../ContractAddress.js'
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
const GoalZappTokenSystem = new web3.eth.Contract(goalzapptokensystem.abi, DeployedAddress.GOALZAPPTOKENSYSTEM)
let  ProxiedGoalEscrow

export default class MenuButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //userTokenBalance: null,
    }
    this.handleClick = this.handleClick.bind(this)
    this.fundGoal = this.fundGoal.bind(this);
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

  ProxiedGoalEscrow = new web3.eth.Contract(goalescrow.abi, this.props.proxyAddress)
    //console.log('this.props.proxyAddress')

  let userTokenBalance = await GoalZappTokenSystem.methods.balanceOf(this.props.selectedAccount).call()
  this.props.setUserTokenBalance(userTokenBalance)
}

async componentDidUpdate(prevProps) {
  if (prevProps.selectedAccount !== this. props.selectedAccount) {
    console.log(this.props.selectedAccount)
    let userTokenBalance = await GoalZappTokenSystem.methods.balanceOf(this.props.selectedAccount).call()
    console.log('userTokenBalance ', userTokenBalance  )
    this.props.setUserTokenBalance(userTokenBalance)
  }

  if(this.props.proxyAddress && prevProps.proxyAddress !== this.props.proxyAddress)
      ProxiedGoalEscrow = new web3.eth.Contract(goalescrow.abi, this.props.proxyAddress)
      let userTokenBalance = await GoalZappTokenSystem.methods.balanceOf(this.props.selectedAccount).call()
      this.props.setUserTokenBalance(userTokenBalance)
  }

handleClick(event) {
  event.stopPropagation()
  this.fundGoal()
}

async fundGoal() {
  if (!this.props.userTokenBalance) {
    alert("You'll need to buy some tokens before you fund your goal")
    return
  }
  let bondFunds
  let rewardFunds
  rewardFunds = window.prompt("Amount of ZAPP tokens you'd like to add to this goal's reward pool")
  //rewardFunds = parseInt(rewardFunds, 10)
  // console.log("rewardFunds1", rewardFunds)
  // console.log("rewardFunds2", rewardFunds)
  bondFunds = window.prompt("Amount of ZAPP tokens you'd like to add to this goal's bond pool")
  // console.log("bondFunds", bondFunds)
  //bondFunds = parseInt(bondFunds, 10)

  if (parseInt(rewardFunds, 10) && parseInt(bondFunds, 10) && this.props.proxyAddress) {
       if (window.confirm(explain1)) {
          if (window.confirm(explain2)) {
         window.alert(explain3)
          }
       }
      // console.log("rewardFunds Type", typeof rewardFunds)
      // console.log("bondFunds Type", typeof bondFunds)
      let totalToSend = rewardFunds + bondFunds
      totalToSend = totalToSend.toString()
      const approvalReciept = await GoalZappTokenSystem.methods.approve(this.props.proxyAddress, web3.utils.toWei(totalToSend)).send({from:window.ethereum.selectedAddress})
      console.log("approvalReciept", approvalReciept)
       const fundReciept = await ProxiedGoalEscrow.methods.fundEscrow(web3.utils.toWei(bondFunds), web3.utils.toWei(rewardFunds)).send({from: window.ethereum.selectedAddress})
      console.log("fundReciept",fundReciept)
      const bondsAmount = await ProxiedGoalEscrow.methods.bondFunds().call()
      console.log(bondsAmount.toString())
      const rewardsFunds = await ProxiedGoalEscrow.methods.rewardFunds().call()
      console.log(rewardsFunds.toString())
      this.props.setBondsAmount(bondsAmount)
      this.props.setRewardsAmount(rewardsFunds)
      let userTokenBalance = await GoalZappTokenSystem.methods.balanceOf(this.props.selectedAccount).call()
      this.setUserTokenBalance(userTokenBalance)
  }
}
render()  {
  // console.log('state.userTokenBalance', this.state.userTokenBalance)
  const fund = 'fund'
  return (
      <div onClick={this.handleClick} className={`FundEscrowButton ${fund}`} >
        <button
        className={`menu-button-user-button ${fund}`}
        >
          Fund Goal
        </button>
        </div>
  )
}
}

 const explain1 = "you'll see two popup windows... 1st to 'approve' the amount of tokens to send.. the 2nd to actually send them.To transfer the tokens, you'll need to click 'approve' to both...Do you want a short explanation of why all of this is necessary?"
 const explain2 = "The safest and easiest way to transfer *tokens* in Ethereum is to give the smart contract on the blockchain permission to pull a specified amount of tokens out of your account... then giving permission to actually take them.  this sounds weird, but it makes sense because we're not actually *sending* tokens anywhere... we're just updating the ledger of the token smart contract, saying 'smart contract I'm sending to has X more tokens, and I have X less tokens... So if we're updating a ledger that is separate from the contract that's having balance increased in this case the GoalEscrow contract... Do you understand that? Click Ok for simple example, click cancel to move on to those pop-ups"
 const explain3 = "Suppose if you wired some money to my bank account my bank would AUTOMATICALLY forward that money to a registered charity...If you just sent the money, the bank wouldn't know who sent it or why... it would just sit in my account.  BUT if my bank *requested* the money from your bank, they could know up front what the instructions are... you approve the request, and you approve the send... In the future when GoalZapp upgrades it's tokens to ERC-777 tokens, the double approve won't be necessary"
