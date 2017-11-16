/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter, Redirect} from 'react-router-dom'
import * as actions from '../../Actions/actions'
// import '../../style/SuggestStep.css'

class SuggestStep extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this._submitSuggestedStep = this._submitSuggestedStep.bind(this)
    this.submitSubsequent = this.submitSubsequent.bind(this)
    this.state = {
      step: " ",
    }
  }

  _submitSuggestedStep(event) {
    event.preventDefault()

    const {step} = this.state
    // const goalDocId = this.props.currentGoalID
    // const suggesterId = this.props.loggedInUserID
    const index = this.props.index
    this.props.dispatch(actions.setSuggestedStep(step, index))
    this.props.dispatch(actions.setClonedStepPositionIndex())
  }

  handleChange(e) {
    this.setState({step: e.target.value});
  }


 submitSubsequent(allClonedSteps) {
    let stepIdsFromServer = allClonedSteps.map(item => item.id)
    // console.log('stepIdsFromServer', stepIdsFromServer)

    let idMatchingServerAndStore

    this.props.currentGoalStepsClone.map((stepObj, mapIndex, array) => {
        idMatchingServerAndStore = stepIdsFromServer.filter((idFromServer) => {
          return idFromServer === stepObj.id
        })
      // if (stepIdsFromServer !== undefined && stepIdsFromServer.length  && stepObj.id) {
        // console.log('%c**UPDATE SITUATION**', "color:blue")

        if (idMatchingServerAndStore !== undefined && idMatchingServerAndStore.length) {
        console.log('%c**UPDATE SITUATION**', "color:blue")
          // console.log('%cID MATCHES', "color:purple", idMatchingServerAndStore)
          return this.props.submitPositionUpdate({
            variables: {
              id: idMatchingServerAndStore[0],
              positionIndex: stepObj.positionIndex
            }
          }).then(({data}) => {
            // console.log('%cSTEP POSITION UPDATED', "color:green", data)
          })
        }
      // }

      else if (!idMatchingServerAndStore.length && stepObj.suggestedStep === true) {
        // console.log('%cSUBMIT SITUATION *Suggested Step*', "color:orange")
        // console.log('this.props', )
        return this.props.submitSuggestedStep({
          variables: {
            suggestedStep: true,
            step: stepObj.step,
            positionIndex: stepObj.positionIndex,
            goalDocId: this.props.goalDocID,
            suggesterId:this.props.loggedInUserID
          }
        }).then(({data}) => {
          // console.log('%cNEW STEP SUBMITTED',"color:green", data);
          this.props.dispatch(actions.setSuggestedStepIdFromServer(mapIndex, data.createClonedStep.id))
        }).then(() => this.props.dispatch(actions.resolveAcceptStep()))
      }

      else if (!idMatchingServerAndStore && stepObj.suggestedStep === false) {
        // console.log('%cSUBMIT SITUATION *Existing step*', "color:orange")
        return this.props.submitSuggestedStep({
          variables: {
            suggestedStep: false,
            step: stepObj.step,
            positionIndex: stepObj.positionIndex,
            goalDocId: this.props.goalDocID,
            suggesterId: this.props.loggedInUserID
          }
        }).then(({data}) => {
          // console.log('%cEXISTING STEP SUBMITTED', "color:green",data);
          this.props.dispatch(actions.setSuggestedStepIdFromServer(mapIndex, data.createClonedStep.id))
        }).then(() => this.props.dispatch(actions.resolveAcceptStep()))

      }
      // console.log('no change currentGoalStepsClone')
      return
    })

 }


  //use this to get the step you added from dispatch in mapStateToProps

  componentWillReceiveProps(nextProps) {
    // console.log('componentwillreceiveprops called')
    // const {step} = this.state
    const goalDocId = nextProps.currentGoalID
    const suggesterId = nextProps.loggedInUserID
    const index = nextProps.index

    let stepIdsFromServer

    const {data: {loading, error, allClonedSteps}} = this.props

    if (!nextProps.data.loading) {
    if (nextProps.currentGoalStepsClone.length > this.props.currentGoalStepsClone.length) {

    // console.log('%cQUERY CALLED / ALL CLONED STEPS', "font-weight: bold", nextProps.data.allClonedSteps)
      stepIdsFromServer = nextProps.data.allClonedSteps.map(item => item.id)


    let idMatchingServerAndStore

    nextProps.currentGoalStepsClone.map((stepObj, mapIndex, array) => {
        idMatchingServerAndStore = stepIdsFromServer.filter((idFromServer) => {
          return idFromServer === stepObj.id
        })
      console.log(idMatchingServerAndStore.length)
      // if (stepIdsFromServer !== undefined && stepIdsFromServer.length > this.props.currentGoalStepsClone.length  && stepObj.id) {
        if (idMatchingServerAndStore !== undefined && idMatchingServerAndStore.length) {
        // console.log('%c**UPDATE SITUATION**', "color:blue")
          // console.log('%cID MATCHES', "color:purple", idMatchingServerAndStore)
          return this.props.submitPositionUpdate({
            variables: {
              id: idMatchingServerAndStore[0],
              positionIndex: stepObj.positionIndex
            }
          }).then(({data}) => {
            // console.log('%cSTEP POSITION UPDATED', "color:green", data)
          })
        }


      else if (!idMatchingServerAndStore.length && stepObj.suggestedStep === true) {
        // console.log('%cSUBMIT SITUATION *Suggested Step*', "color:orange")
        return this.props.submitSuggestedStep({
          variables: {
            suggestedStep: true,
            step: stepObj.step,
            positionIndex: stepObj.positionIndex,
            goalDocId: this.props.goalDocID,
            suggesterId: this.props.loggedInUserID
          }
        }).then(({data}) => {
          // console.log('%cNEW STEP SUBMITTED',"color:green", data);
          this.props.dispatch(actions.setSuggestedStepIdFromServer(mapIndex, data.createClonedStep.id))
        }).then(() => this.props.dispatch(actions.resolveAcceptStep())
    )}

      else if (!idMatchingServerAndStore.length && stepObj.suggestedStep === false) {
        // console.log('%cSUBMIT SITUATION *Existing step*', "color:orange")
        return this.props.submitSuggestedStep({
          variables: {
            suggestedStep: false,
            step: stepObj.step,
            positionIndex: stepObj.positionIndex,
            goalDocId: this.props.goalDocID,
            suggesterId
          }
        }).then(({data}) => {
          // console.log('%cEXISTING STEP SUBMITTED', "color:green",data);
          this.props.dispatch(actions.setSuggestedStepIdFromServer(mapIndex, data.createClonedStep.id))
        }).then(() => this.props.dispatch(actions.resolveAcceptStep()))
      }
    // }
      // console.log('nextProps called / no change currentGoalStepsClone')
    })
    }
  }
}

  render() {
    // if (this.props.data.loading) {
    //   return (<div>Loading</div>)
    // }
    // if (!this.props.data.user) {
    //   console.log('Bad User!')
    //   return (<Redirect to ={{
    //     pathname: '/'
    //   }}/>)
    if( this.props.resolveAcceptStep) {
      this.props.data.refetch().then(({data}) => this.submitSubsequent(this.props.data.allClonedSteps))
        }

    if (this.props.loggedInUserID !== this.props.targetUserID) {
      return (
        <div className="suggest-step-input">
          <form onSubmit={this._submitSuggestedStep}>
            <input type="text" onChange={this.handleChange} placeholder="" value={this.state.step}/>
            <input className="suggest-step-button" type="submit" value="Suggest Step"/>
          </form>
        </div>
      )
    } else {
      console.log('Not a foreign user!')
      return null
    }
  }
}

const mapStateToProps = (state, props) => {
  return {loggedInUserID: state.goals.loggedInUserID, targetUserID: state.goals.targetUserID, currentGoalID: state.goals.currentGoalID, currentGoalStepsClone: state.goals.currentGoalStepsClone, goalDocID: state.goals.currentGoalID, resolveAcceptStep: state.goals.resolveAcceptStep}
}

const userQuery = gql `
  query userQuery {
    user {
      id
    }
  }
`
const clonedStepIdQuery = gql `
query($id:ID){
  allClonedSteps(
    filter:{goalDoc:{id:$id}}
  )
 {
 id
}}`

const _suggestStepMutation = gql `mutation ($positionIndex: Int!, $step: String!, $suggestedStep: Boolean!, $goalDocId: ID, $suggesterId: ID) {
  createClonedStep(
    positionIndex: $positionIndex,
    step: $step,
    suggestedStep: $suggestedStep,
    goalDocId: $goalDocId,
    suggesterId: $suggesterId)
    {
    step,
    positionIndex,
    id,
    suggestedStep
  }
}`

const positionUpdateMutation = gql `mutation($id: ID!, $positionIndex: Int)
 {updateClonedStep(id:$id, positionIndex: $positionIndex
) {
   id
 }} `

const SuggestStepWithMutation = compose(

graphql(userQuery, {
  options: {
    fetchPolicy: 'network-only'
  }
}),
graphql(clonedStepIdQuery, {
  options: ({goalDocID}) => ({
    variables: {
      id: goalDocID
    }
  })
}),
graphql(_suggestStepMutation, {
  name: 'submitSuggestedStep',
  props: ({submitSuggestedStep}) => ({
    submitSuggestedStep({variables}) {
      return submitSuggestedStep({
        variables: {
          ...variables
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  })
}),
graphql(positionUpdateMutation, {
  name: 'submitPositionUpdate',
  props: ({submitPositionUpdate}) => ({
    submitPositionUpdate({variables}) {
      return submitPositionUpdate({
        variables: {
          ...variables
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  })
}))(withRouter(SuggestStep))

export default connect(mapStateToProps)(SuggestStepWithMutation);
