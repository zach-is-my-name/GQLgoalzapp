import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter, Redirect } from 'react-router-dom'
import '../../style/InputGoal.css'
import goalzapptokensystem from '../../abi/GoalZappTokenSystem.json'
import goalescrow from '../../abi/GoalEscrowTestVersion.json'
import proxyfactory from '../../abi/ProxyFactory.json'
import * as DeployedAddress from '../../ContractAddress.js'
import {daysToSeconds} from '../../Utils/Utils.js'
import {minutesToSeconds} from '../../Utils/Utils.js'
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
let accounts = web3.eth.getAccounts()
let selectedAddress;
let proxyAddress;
// console.log(goalzapptokensystem)
// console.log(window)
const GoalZappTokenSystem = new web3.eth.Contract(goalzapptokensystem.abi, DeployedAddress.GOALZAPPTOKENSYSTEM)
let  ProxiedGoalEscrow
const ProxyFactory = new web3.eth.Contract(proxyfactory.abi, DeployedAddress.PROXYFACTORY)

const goalInputMutation = gql `mutation goalInputMutation($goal: String, $ownersId: ID, $proxyAddress: String) {
  createGoalDoc(goal:$goal, ownersId: $ownersId, proxyAddress: $proxyAddress ) {
    goal
    id
    proxyAddress
  }
}`

const GoalDocQuery = gql `query allGoalDocsQuery ($targetUserId: ID) {
  allGoalDocs(
    filter:
    {owners :{id: $targetUserId}}, orderBy: updatedAt_DESC
  )
    {
    goal
    id
    proxyAddress
  }
}`
 class InputGoalSmart extends React.Component {
    constructor(props) {
        super(props)
    this.handleChange = this.handleChange.bind(this);
    this.submitGoal = this.submitGoal.bind(this);
    this.initAndFundGoal = this.initAndFundGoal.bind(this)
    this.initGoal = this.initGoal.bind(this)
    this.state = {
      goal : '',
      proxyAddress: "",
      userTokenBalance: null,
      proxyAddress: null,
    }
 }


async submitGoal(event)  {
  event.preventDefault()
  if (this.state.proxyAddress) {
    alert("Something's wrong: proxyAddress already exists")
    return
  }
  const {goal} = this.state;
  this.setState({goal:''})
  let createProxyResult = await ProxyFactory.methods.build(goal).send({from: window.ethereum.selectedAddress})
  console.log('createProxyResultEventsProxy', createProxyResult.events.Created.returnValues.proxy)
  console.log(createProxyResult)
  let proxyAddress = createProxyResult.events.Created.returnValues.proxy
  this.setState({proxyAddress})
  let userTokenBalance = await GoalZappTokenSystem.methods.balanceOf(window.ethereum.selectedAddress).call()
  // console.log("userTokenBalance", userTokenBalance)
  this.setState({userTokenBalance})
    if (this.state.proxyAddress && this.state.userTokenBalance) {
      ProxiedGoalEscrow = new web3.eth.Contract(goalescrow.abi, this.state.proxyAddress)
     if (window.confirm("You've created a goal... would you like to fund it now?")) {
       this.initAndFundGoal()
     } else {
       this.initGoal()
     }
    }
  const ownersId = this.props.loggedInUserId
    this.props.inputGoal({variables: { goal, ownersId, proxyAddress}}).then(
      ({data}) => {
        // console.log("data.createGoalDoc.id", data.createGoalDoc.id)
        this.props._setGoalDocIdOnCreate(data.createGoalDoc.id)}
    )
    .catch((error) => {
      console.log('there was an error sending the query', error)
    })
    console.log("this.state.proxyAddress", this.state.proxyAddress)
    // console.log("this.state.userTokenBalance", this.state.userTokenBalance)

 }

handleChange(e) {
  this.setState({goal: e.target.value });
    }

async initGoal(event) {
  const initReciept = await ProxiedGoalEscrow.methods.newGoalInit(DeployedAddress.GOALZAPPTOKENSYSTEM, minutesToSeconds(3)).send({from:window.ethereum.selectedAddress})
  console.log('initReciept',initReciept)
}

async initAndFundGoal(event) {
  // this gets set on componentDidMount
  // wait for a transaction and a  balance (event) then proceed
  if (!this.state.userTokenBalance) {
    alert("You'll need to buy some tokens before you fund your goal")
    return
  }
  let bondFunds
  let rewardFunds
  rewardFunds = window.prompt("Amount of ZAPP tokens you'd like to add to this goal's reward pool")
  rewardFunds = parseInt(rewardFunds, 10)
  // console.log("rewardFunds1", rewardFunds)
  if (rewardFunds !== null) {
    // typeof rewardFunds !== "number" || rewardFunds <= 0 ? rewardFunds = 0 && window.alert("Try again with an amount above 0") : null
  }
  // console.log("rewardFunds2", rewardFunds)
  bondFunds = window.prompt("Amount of ZAPP tokens you'd like to add to this goal's bond pool")
  // rewardFunds > 0 ? bondFunds = window.prompt("Amount of ZAPP tokens you'd like to add to this goal's bond pool"): null
  // console.log("bondFunds", bondFunds)
  bondFunds = parseInt(bondFunds, 10)
    if (bondFunds !== null) {
      // typeof bondFunds !== "number" || bondFunds  <= 0 ? bondFunds = 0 && window.alert("Try again with an amount above 0") : null
      }

  if (rewardFunds && bondFunds && this.state.proxyAddress) {
       if (window.confirm(explain1)) {
          if (window.confirm(explain2)) {
         window.alert(explain3)
          }
       }
      // console.log("rewardFunds Type", typeof rewardFunds)
      // console.log("bondFunds Type", typeof bondFunds)
      let totalToSend = rewardFunds + bondFunds
      totalToSend = totalToSend.toString()
      const approvalReciept = await GoalZappTokenSystem.methods.approve(this.state.proxyAddress, web3.utils.toWei(totalToSend)).send({from:window.ethereum.selectedAddress})
       console.log("approvalReciept", approvalReciept)
       // console.log('minutesToSeconds', minutesToSeconds(2))
      // const initMasterReciept = await ProxiedGoalEscrow.methods.initMaster(DeployedAddress.GOALZAPPTOKENSYSTEM, minutesToSeconds(2)).send({from:window.ethereum.selectedAddress})
      // console.log("initMasterReciept", initMasterReciept)
      const initAndFundReciept = await ProxiedGoalEscrow.methods.newGoalInitAndFund(DeployedAddress.GOALZAPPTOKENSYSTEM, minutesToSeconds(2), web3.utils.toWei(bondFunds.toString()), web3.utils.toWei(rewardFunds.toString())).send({from:window.ethereum.selectedAddress})
      // const initAndFundReciept = await ProxiedGoalEscrow.methods.newGoalInitAndFund(DeployedAddress.GOALZAPPTOKENSYSTEM, minutesToSeconds(2)).send({from:window.ethereum.selectedAddress})
       console.log("initAndFundReciept", initAndFundReciept)
  }
   rewardFunds > 0 ? this.setState({rewardFundsToSend: rewardFunds}) : console.log("can't set state with rewardFunds", rewardFunds)
   bondFunds > 0 ? this.setState({bondFundsToSend: bondFunds}): console.log("can't set state with bondFunds", bondFunds)


}
        async componentDidMount() {
          if (!window.ethereum.selectedAddress) {
            alert('Log into metamask to continue')
          try {
            await window.ethereum.enable()
          } catch (error) {
            console.log(error)
          }
          }
  ProxiedGoalEscrow = new web3.eth.Contract(goalescrow.abi, this.props.proxyAddress)

  let userTokenBalance = await GoalZappTokenSystem.methods.balanceOf(this.props.selectedAccount).call()
  // console.log('userTokenBalance ', userTokenBalance  )
  this.setState({userTokenBalance})
}

async componentDidUpdate(prevProps) {
  if (prevProps.selectedAccount !== this.props.selectedAccount) {
    let userTokenBalance = await GoalZappTokenSystem.methods.balanceOf(this.props.selectedAccount).call()
    console.log('userTokenBalance ', userTokenBalance  )
    this.setState({userTokenBalance})
  if(this.props.proxyAddress && prevProps.proxyAddress !== this.props.proxyAddress)
    ProxiedGoalEscrow = new web3.eth.Contract(goalescrow.abi, this.props.proxyAddress)
  }
}


    render() {
        return (
        <div className="goalinput-form">
          <form onSubmit={this.submitGoal}>
            <input type="text" id="form-text" placeholder=""
              onChange={this.handleChange}
              value={this.state.goal}/>
            <input type="submit" value="ZappIt"/>
          </form>
        </div>
      )
    }
  }

const InputGoalWithData =
graphql(goalInputMutation, {
  props: ({mutate}) => ({
    inputGoal({variables}) {
      return mutate({
      variables: {
        ...variables
      }
      ,
      refetchQueries:['allGoalDocsQuery']
    })
      .catch((error) => {
        console.log('there was an error sending the query', error)
      })
      }
    })
})
(InputGoalSmart)

 const explain1 = "you'll see two popup windows... 1st to 'approve' the amount of tokens to send.. the 2nd to actually send them.To transfer the tokens, you'll need to click 'approve' to both...Do you want a short explanation of why all of this is necessary?"
 const explain2 = "The safest and easiest way to transfer *tokens* in Ethereum is to give the smart contract on the blockchain permission to pull a specified amount of tokens out of your account... then giving permission to actually take them.  this sounds weird, but it makes sense because we're not actually *sending* tokens anywhere... we're just updating the ledger of the token smart contract, saying 'smart contract I'm sending to has X more tokens, and I have X less tokens... So if we're updating a ledger that is separate from the contract that's having balance increased in this case the GoalEscrow contract... Do you understand that? Click Ok for simple example, click cancel to move on to those pop-ups"
 const explain3 = "Suppose if you wired some money to my bank account my bank would AUTOMATICALLY forward that money to a registered charity...If you just sent the money, the bank wouldn't know who sent it or why... it would just sit in my account.  BUT if my bank *requested* the money from your bank, they could know up front what the instructions are... you approve the request, and you approve the send... In the future when GoalZapp upgrades it's tokens to ERC-777 tokens, the double approve won't be necessary"

export default InputGoalWithData
