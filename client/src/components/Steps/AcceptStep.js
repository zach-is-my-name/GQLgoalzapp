/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions'

class AcceptStep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      successMutation: false
    }
    this._submitAcceptedStep = this._submitAcceptedStep.bind(this)
    this._setIds = this._setIds.bind(this)
    this.updateClonedStepPositionIndex = this.updateClonedStepPositionIndex.bind(this)
  }

  _setIds(ids) {
    this.setState({ids})
  }

  _submitAcceptedStep() {
    const step = this.props.step
    const index = this.props.index
    this.props.dispatch(actions.setStep(this.props.step, this.props.index, this.props.id))
    this.props.dispatch(actions.setStepPositionIndex())
  }


  componentWillReceiveProps(nextProps) {
    if (!nextProps.stepQuery.loading) {
    let  stepIdsServer = nextProps.stepQuery.allSteps.map((item) => item.id)

      if (nextProps.currentGoalSteps.length > this.props.currentGoalSteps.length) {

        nextProps.currentGoalSteps.map((stepObj, mapIndex, array) => {

          // if (stepIdsServer && stepIdsServer.length && stepObj.id) {
            // console.log('%c**STEP UPDATE SITUATION', 'color:blue')
          let  serverAndStateIdsMatch = stepIdsServer.filter(idFromServer =>
               idFromServer === stepObj.id)
            // console.log('serverAndStateIdsMatch', serverAndStateIdsMatch)
          // }
            if (serverAndStateIdsMatch && serverAndStateIdsMatch.length && !stepObj.originalId) {
              return this.props.updateStepPosition({
                variables: {
                  id: serverAndStateIdsMatch[0],
                  originalId: this.props.currentGoalStepsClone[mapIndex].id,
                  positionIndex: stepObj.positionIndex
                }
              })
              .then(({data}) => {
                console.log('%cCURRENT_STEP POSITION UPDATED (assign OriginalId)', "color: green", data)
              })
            }
            else if (serverAndStateIdsMatch && serverAndStateIdsMatch.length) {
              return this.props.updateStepPosition({
                variables: {
                  id: serverAndStateIdsMatch[0],
                  positionIndex: this.props.currentGoalStepsClone[mapIndex].id,
                }
              })
              .then(({data}) => {
                console.log('%cCURRENT_STEP POSITION UPDATED', "color: green", data)
              })
            }
          else {
            // console.log('%cSTEP SUBMIT SITUATION', 'color:orange')
            return this.props.submitAcceptedStep({
              variables: {
                step: this.props.step,
                goalDocId: this.props.goalDocId,
                positionIndex: stepObj.positionIndex,
                suggestedStep: false,
                originalId: this.props.stepId
              }
            }).catch((error) => {
              console.log(error)
            }).then(({data}) => {
              console.log('%cSTEP SUBMITTED', 'color:green', data)
               this.props.dispatch(actions.setStepIdFromServer(mapIndex, data.createStep.id)
             )})
            .then(() => this.props.dispatch(actions.resolveAcceptStep())
            )
          }
          console.log('nextProps called / no change currentGoalSteps')
        })
      }
    }
  }

  render() {

    if (this.props.resolveAcceptStep) {
    // this.props.clonedStepIdQuery.refetch().then(({data}) => console.log(data.allClonedSteps))
      this.props.clonedStepIdQuery.refetch().then(({data}) =>
      this.updateClonedStepPositionIndex(this.props.clonedStepIdQuery.allClonedSteps))
    }

    return (
      <div>
        <button>cancel</button>
        <button onClick={this._submitAcceptedStep}>confirm</button>
        {this.state.successMutation
          ? <div>
            <p>
              Success!
            </p>
          </div>
        : null}
      </div>
    )
  }
  updateClonedStepPositionIndex(allClonedSteps) {
  let clonedstepIdsServer = allClonedSteps.map(item => item.id)
    let clonedserverAndStateIdsMatch
    this.props.currentGoalStepsClone.map((stepObj, mapIndex, array) => {
      // console.log('MAP CALLED, clonedstepIdsServer =', clonedstepIdsServer)
      if (clonedstepIdsServer && clonedstepIdsServer.length && stepObj.id) {
        // console.log('%c**CLONED_STEP UPDATE SITUATION', 'color:blue')
        clonedserverAndStateIdsMatch = clonedstepIdsServer.filter((idFromServer) => {
            return idFromServer === stepObj.id
          })}
        if (clonedserverAndStateIdsMatch && clonedserverAndStateIdsMatch.length) {
          // console.log('%cCLONED_STEP ID MATCHES', 'color:purple', clonedserverAndStateIdsMatch)
          return this.props.updateClonedStepPosition({
            variables: {
              id: clonedserverAndStateIdsMatch[0],
              positionIndex: stepObj.positionIndex
            }
          }).then(({data}) => {
            // console.log('%cCLONED_STEP POSITION UPDATED', 'color:green', data)
          })
          // .then(() => {
          // })
          this.setState((prevState) => ({
            successMutation: !prevState.successMutation
          }))
        }
      })
      // console.log('this.props called / no change currentGoalStepsClone')

      this.props.dispatch(actions.setSuggestedToFalse(this.props.currentGoalStepsCloneSelectedIndex, this.props.index))
  }
}
const mapStateToProps = (state, props) => {
  return {currentGoalSteps: state.goals.currentGoalSteps, goalDocId: state.goals.currentGoalID, currentGoalStepsClone: state.goals.currentGoalStepsClone, resolveAcceptStep: state.goals.resolveAcceptStep, currentGoalStepsCloneSelectedIndex: state.goals.currentGoalStepsClone[props.index]}
}

const _stepQuery = gql `
query ($goalDocId: ID) {
  allSteps(
    filter: {goalDoc: {id: $goalDocId}}, orderBy: positionIndex_ASC
  ) {
    id
    step
    positionIndex
  }
}`

const acceptStep = gql `
mutation($step:String!, $positionIndex:Int, $suggestedStep: Boolean, $goalDocId: ID, $originalId: String){
  createStep(step: $step, positionIndex: $positionIndex, suggestedStep: $suggestedStep, goalDocId: $goalDocId, originalId: $originalId) {
    id
    step
    originalId
  }}`

const removeClonedStep = gql `
mutation($id: ID!){
  deleteClonedStep(id: $id) {
    id
  }}`

const updateStepPosition = gql `mutation($id:ID!,
$positionIndex: Int, $originalId: String)
  {updateStep(id:$id, positionIndex: $positionIndex, originalId: $originalId
  ) {
    id
    originalId
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

connect(mapStateToProps)(AcceptStep)

const AcceptStepWithMutation = compose(
// graphql(userQuery, {
//   options: {
//     fetchPolicy: 'network-only'
//   }
// }),
graphql(_stepQuery, {
  name: 'stepQuery',
  options: ({goalDocId}) => ({fetchPolicy: 'network-only', notifyOnNetworkStatusChange: true, variables: {
      goalDocId
    }})
}), graphql(clonedStepIdQuery, {
  name: 'clonedStepIdQuery',
  options: ({goalDocId}) => ({
    // fetchPolicy: 'network-only',
   variables: {
      goalDocId
    }})
}), graphql(acceptStep, {
  name: 'submitAcceptedStep',
  props: ({submitAcceptedStep}) => ({
    submitAcceptedStep({variables}) {
      return submitAcceptedStep({
        variables: {
          ...variables
        }
      }).catch((error) => {
        console.log('there was an error sending the mutation', error)
      })
    }
  })
}), graphql(updateStepPosition, {
  name: 'updateStepPosition',
  props: ({updateStepPosition}) => ({
    updateStepPosition({variables}) {
      return updateStepPosition({
        variables: {
          ...variables
        }
      }).catch((error) => {
        console.error(error)
      })
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

export default connect(mapStateToProps)(AcceptStepWithMutation)
