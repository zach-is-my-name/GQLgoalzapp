/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions'

const UpdateOrCreateStep = gql `
mutation ($goalDocId:ID, $step: String!, $id: ID!, $positionIndex: Int, $suggestedStep: Boolean, $originalId: String) {
  updateOrCreateStep(create: {goalDocId: $goalDocId,
  step: $step, positionIndex: $positionIndex, suggestedStep: $suggestedStep, originalId: $originalId }, update: {goalDocId: $goalDocId,
  positionIndex: $positionIndex, id: $id})
  {
   step
   id
   goalDoc {
     id
   }
  }
}
`
const removeClonedStep = gql `
mutation($id: ID!){
  deleteClonedStep(id: $id) {
    id
  }}`

const updateClonedStepPosition = gql `mutation($id: ID!, $positionIndex: Int)
 {updateClonedStep(id:$id, positionIndex: $positionIndex, suggestedStep: false
) {
   id
 }}`

const clonedStepIdQuery = gql `
  query($goalDocId:ID){
    allClonedSteps(
      filter:{goalDoc:{id:$goalDocId}}
    )
   {
   id
  }}`

// const userQuery = gql `
//   query userQuery {
//     user {
//       id
//     }
//   }
// `

class AcceptStep extends Component {

  constructor(props) {
    super(props)
    this.state = {
      successMutation: false
    }
    this._submitAcceptedStep = this._submitAcceptedStep.bind(this)
    this.updateClonedStepPositionIndex = this.updateClonedStepPositionIndex.bind(this)
  }

  _submitAcceptedStep() {
    const step = this.props.step
    const index = this.props.index
    // this.props.dispatch(actions.setStep(this.props.step, this.props.index, this.props.id))
    this.props.dispatch(actions.setStepPositionIndex())
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentGoalSteps.length > this.props.currentGoalSteps.length) {
      nextProps.currentGoalSteps.map((stepObj, mapIndex, array) => {
        let id
        !stepObj.id
          ? id = 'x'
          : id = stepObj.id

        if (!stepObj.originalId && id !== "x") {
          console.log("Update Step Position and Assign OriginalId", id)
          return this.props.updateOrCreateStep({
            variables: {
              id: id,
              originalId: id,
              positionIndex: stepObj.positionIndex,
              step: "z"
            }
          }).then(({data}) => {
            console.log('%cUpdated Position Index && Assigned OrginalId', "color: green", data)
          })
        } else if (!stepObj.originalId && id === "x") {
          console.log("Create Step", id)
          return this.props.updateOrCreateStep({
            variables: {
              id: id,
              positionIndex: stepObj.positionIndex,
              suggestedStep: false,
              goalDocId: this.props.goalDocId,
              step: stepObj.step
            }
          }).then(({data}) => {
            console.log('%cCreated Step', "color: green", data)
            this.props.dispatch(actions.setStepIdFromServer(mapIndex, data.updateOrCreateStep.id))
          })
        } else if (stepObj.originalId) {
          console.log("has OriginalId, just update positionIndex")
          return this.props.updateOrCreateStep({
            variables: {
              id: id,
              positionIndex: stepObj.positionIndex,
              string: "y"
            }
          }).then(({data}) => {
            console.log('%cUpdated Position Index Only', "color: green", data)
          }).catch((error) => {
            console.log(error)
          })
        }
      })
    }
  }
  // updateClonedStepPositionIndex(allClonedSteps)

  render() {

    return (<div>
      <button>cancel</button>
      <button onClick={this._submitAcceptedStep}>confirm</button>
      {
        this.state.successMutation
          ? <div>
            <p>
              Success!
            </p>
          </div>
          : null
      }
    </div>)
  }

  updateClonedStepPositionIndex(allClonedSteps) {
    let clonedstepIdsServer = allClonedSteps.map(item => item.id)
    // let clonedserverAndStateIdsMatch
    this.props.currentGoalStepsClone.map((stepObj, mapIndex, array) => {
      console.log('MAP CALLED, clonedstepIdsServer =', clonedstepIdsServer)
      if (clonedstepIdsServer && clonedstepIdsServer.length && stepObj.id) {
        console.log('%c**CLONED_STEP UPDATE SITUATION', 'color:blue')
        clonedserverAndStateIdsMatch = clonedstepIdsServer.filter((idFromServer) => {
          return idFromServer === stepObj.id
        })
      }

      if (clonedserverAndStateIdsMatch && clonedserverAndStateIdsMatch.length) {
        console.log('%cCLONED_STEP ID MATCHES', 'color:purple', clonedserverAndStateIdsMatch)
        return this.props.updateClonedStepPosition({
          variables: {
            id: clonedserverAndStateIdsMatch[0],
            positionIndex: stepObj.positionIndex
          }
        }).then(({data}) => {
          console.log('%cCLONED_STEP POSITION UPDATED', 'color:green', data)
        }).then(() => {})
      }
      console.log('this.props called / no change currentGoalStepsClone')

      this.props.dispatch(actions.setSuggestedToFalse(this.props.currentGoalStepsCloneSelectedIndex, this.props.index))
    })}
}

const mapStateToProps = (state, props) => {
  return {
    currentGoalSteps: state.goals.currentGoalSteps,
    goalDocId: state.goals.currentGoalID,
    currentGoalStepsClone: state.goals.currentGoalStepsClone,
    resolveAcceptStep: state.goals.resolveAcceptStep,
    currentGoalStepsCloneSelectedIndex: state.goals.currentGoalStepsClone[props.index]
  }
}

connect(mapStateToProps)(AcceptStep)

const AcceptStepWithApollo = compose(graphql(UpdateOrCreateStep, {
  props: ({mutate}) => ({
    updateOrCreateStep({variables}) {
      return mutate({
        variables: {
          ...variables
        }
      }).catch((error) => {
        console.log('there was an error sending the query', error)
      })
    }
  })
}), graphql(clonedStepIdQuery, {
  name: 'clonedStepIdQuery',
  options: ({goalDocId}) => ({
    // fetchPolicy: 'network-only',
    variables: {
      goalDocId
    }
  })
}), graphql(removeClonedStep, {
  name: 'deleteClonedStep',
  props: ({deleteClonedStep}) => ({
    deleteClonedStep({variables}) {
      return deleteClonedStep({
        variables: {
          ...variables
        }
      }).catch((error) => {
        console.log('there was an error sending the mutation', error)
      })
    }
  })
}), graphql(updateClonedStepPosition, {
  name: 'updateClonedStepPosition',
  props: ({updateClonedStepPosition}) => ({
    updateClonedStepPosition({variables}) {
      return updateClonedStepPosition({
        variables: {
          ...variables
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  })
}))(AcceptStep)

export default connect(mapStateToProps)(AcceptStepWithApollo)
