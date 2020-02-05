/* eslint-disable */
import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter, Redirect} from 'react-router-dom'
import SuggestStep from './SuggestStep.js'
import goalescrow from '../../abi/GoalEscrowTestVersion.json'
import tokensystem from '../../abi/GoalZappTokenSystem.json'
import * as DeployedAddress from '../../ContractAddress.js'
var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");
let ProxiedGoalEscrow
const GoalZappTokenSystem = new web3.eth.Contract(tokensystem.abi, DeployedAddress.GOALZAPPTOKENSYSTEM )
// import '../../style/SuggestStep.css'

const clonedStepIdQuery = gql `
 query clonedStepIdQuery($id:ID){
   allClonedSteps(filter: {goalDoc: {id: $id}}, orderBy: positionIndex_ASC) {
      id
      positionIndex
      step
      suggestedStep

    }
  }`

const updateOrCreateClonedStep = gql `mutation updateOrCreateClonedStepMutation ($goalDocId: ID, $id: ID!, $positionIndex: Int!, $step: String!, $suggestedStep: Boolean!, $suggesterId: ID!) {
    updateOrCreateClonedStep(create: {goalDocId: $goalDocId,
    positionIndex: $positionIndex, suggestedStep: $suggestedStep,
    step: $step, suggesterId: $suggesterId }, update: {goalDocId: $goalDocId, positionIndex:
    $positionIndex, id: $id, suggesterId: $suggesterId}) {
      step
      id
      suggester{
        id
        userName
      }
      goalDoc {
        id
      }
    }}`

const goalDocByIdQuery = gql `
    query RefetchGoalDocByIdQuery ($goalDocId: ID) {
      GoalDoc(id: $goalDocId) {
       goal
       id
       proxyAddress
       steps(orderBy:positionIndex_ASC) {
         step
         positionIndex
         suggestedStep
         id
       }
       clonedSteps(orderBy:positionIndex_ASC) {
         step
         positionIndex
         id
         suggestedStep
         stepsId
         suggester {
           id
           userName
         }
       }
      }
    }`;

class SuggestStepSmart extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this._submitSuggestedStep = this._submitSuggestedStep.bind(this)
    this._submitSuggestedStepMutation = this._submitSuggestedStepMutation.bind(this)
    // this.submitSubsequent = this.submitSubsequent.bind(this)
    this.state = {
      step: " ",
      userTokenBalance: null,
    }
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

    let userTokenBalance = await GoalZappTokenSystem.methods.balanceOf(this.props.selectedAccount).call()
    console.log('userTokenBalance ', userTokenBalance  )
    this.setState({userTokenBalance})
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.selectedAccount !== this. props.selectedAccount) {
      console.log(this.props.selectedAccount)
      let userTokenBalance = await GoalZappTokenSystem.methods.balanceOf(this.props.selectedAccount).call()
      console.log('userTokenBalance ', userTokenBalance  )
      this.setState({userTokenBalance})
    if(this.props.proxyAddress && prevProps.proxyAddress !== this.props.proxyAddress)
      ProxiedGoalEscrow = new web3.eth.Contract(goalescrow.abi, this.props.proxyAddress)
    }
  }



  render() {

    if (this.props.loggedInUserId && this.props.loggedInUserId !== this.props.targetUser) {
      return (
        <SuggestStep _submitSuggestedStep={this._submitSuggestedStep}
          handleChange={this.handleChange}
          value={this.state.step} />
      )
    } else if (!this.props.loggedInUserId) {
      // TODO also check if the cloned steps are owned by the user.  This becomes more clear with 'suggestions by user'
      return null
    }
    else {
      console.log('Not a foreign user!')
      return null
    }
  }
  handleChange(e) {
    this.setState({step: e.target.value});
  }

  async _submitSuggestedStep(event) {
    event.preventDefault()
    let userTokenBalance = await GoalZappTokenSystem.methods.balanceOf(window.ethereum.selectedAddress).call()
    // console.log(this._reorderSteps(this.props.clonedStepIdQuery))
    if (this.props.loggedInUserId && userTokenBalance > 0) {
      let suggesterBond = window.prompt("Enter amout of tokens you'd like to send as bond to your suggestion. Upon resolution of your suggestion, this amount will become fully sendable and tradable without restriction.")
      console.log(userTokenBalance)
      console.log(typeof suggesterBond)
      if (suggesterBond <= 0) {
        return
      }
      if (suggesterBond > web3.utils.fromWei(userTokenBalance)) {
        alert("you don't own that many tokens in this address... you'll either need to buy more or transfer some in who's restriction has been lifted")
        return
      }
    let approveReceipt = await GoalZappTokenSystem.methods.approve(this.props.proxyAddress, web3.utils.toWei(suggesterBond)).send({from:window.ethereum.selectedAddress})
    .on('error', error  => console.log(error))
    if (approveReceipt === 'Error' || false) {
      return
    }
    let depositOnSuggestReceipt =  await ProxiedGoalEscrow.methods.depositOnSuggestTestVersion(web3.utils.toHex(this.props.goalDocId), web3.utils.toWei(suggesterBond), this.props.proxyAddress).send({from:window.ethereum.selectedAddress})
      .on("receipt", receipt => console.log(receipt))
      .on("error", (error, receipt) => console.log(error))
      if (depositOnSuggestReceipt === "Error" || false) {
        alert("transaction failed -- check console")
        return
      }
      await this._submitSuggestedStepMutation(this._reorderSteps(this.props.clonedStepIdQuery))
      this.props.unrenderSuggestStepFunctiion()
  } else if (!this.props.loggedInUserId && this.state.step) {
    //render create user; save step state; when create user resolves send mutation
    }
    else if (userTokenBalance === 0 ) {
      alert("you need to have some tokens to suggest a step.  the token is sent as a bond held in escrow.  when the goal owner takes action on the step, or time expires, you get what ever tokens you sent as bond sent back to your wallet")
    }
  }

  _reorderSteps(queryResult) {
    const {loading, error, allClonedSteps} = queryResult
    if (!loading) {
      // console.log('query result', allClonedSteps)
      // console.log(allSteps)
      const newStep = {
        step: this.state.step,
        suggestedStep: true,
        id: null,
        positionIndex: null
      }
      const stepIndex = this.props.stepIndex
      // console.log(stepIndex)
      const newSteps = allClonedSteps.slice()
      newSteps.splice(stepIndex, 0, newStep )
      return newSteps.map((stepObj, index) => ({
        ...stepObj,
        positionIndex: index
      }))
    }
  }

  _submitSuggestedStepMutation = async (newClonedStepsSortedByPositionIndex) => {
    // console.log(newClonedStepsSortedByPositionIndex)
    newClonedStepsSortedByPositionIndex.map(async (stepObj, mapIndex, array) => {
      let id
      if (stepObj.id) {
        id = stepObj.id
      } else {
        id = "x"
      }
      const suggestStepResult = await this.props.updateOrCreateClonedStep({
        variables: {
          goalDocId: this.props.goalDocId,
          id: id,
          positionIndex: stepObj.positionIndex,
          suggestedStep: stepObj.suggestedStep,
          step: stepObj.step,
          suggesterId: this.props.loggedInUserId
        }
      })
      // console.log(suggestStepResult)
    })
  }

}

export default compose(
  graphql(clonedStepIdQuery, {
    name:"clonedStepIdQuery",
    options: (ownProps) => ({
      variables: {
        id: ownProps.goalDocId
      },
      fetchPolicy: 'network-only'
    })
  }),
  graphql(updateOrCreateClonedStep, {
  name: 'updateOrCreateClonedStep',
  props: ({updateOrCreateClonedStep}) => ({
    updateOrCreateClonedStep({variables}) {
      return updateOrCreateClonedStep({
        variables: {
          ...variables
        },
        refetchQueries: ['goalDocByIdQuery']
      }).catch((error) => {
        console.error(error)
      })
    }
  })
}))(withRouter(SuggestStepSmart))
