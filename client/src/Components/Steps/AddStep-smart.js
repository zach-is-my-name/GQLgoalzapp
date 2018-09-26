/* eslint-disable */
import React, {Component} from 'react'
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom'
import * as actions from '../../Actions/actions'
import AddStep from './AddStep'
import '../../style/AddStep.css'


const stepIdQuery = gql `
query stepIdQuery($id:ID){
  allSteps(filter: {goalDoc: {id: $id}}, orderBy: positionIndex_ASC) {
     id
     positionIndex
     step
   }
 }`


const UpdateOrCreateStep = gql `
mutation updateOrCreateStepMutation ($goalDocId:ID, $step: String!, $id: ID!, $positionIndex: Int, $suggestedStep: Boolean) {
  updateOrCreateStep(create: {goalDocId: $goalDocId,
  step: $step, positionIndex: $positionIndex, suggestedStep: $suggestedStep, }, update: {goalDocId: $goalDocId,
  positionIndex: $positionIndex, id: $id})
  {
   step
   id
   goalDoc {
     id
   }
  }
}`

const UpdateOrCreateClonedStep = gql `mutation updateOrCreateClonedStepMutation ($goalDocId: ID, $id: ID!, $positionIndex: Int!, $step: String!, $suggestedStep: Boolean!, $suggesterId: ID!) {
    updateOrCreateClonedStep(create: {goalDocId: $goalDocId,
    positionIndex: $positionIndex, suggestedStep: $suggestedStep,
    step: $step, suggesterId: $suggesterId }, update: {goalDocId: $goalDocId, positionIndex:
    $positionIndex, id: $id, suggesterId: $suggesterId}) {
      step
      id
      goalDoc {
        id
      }
    }}`

const goalDocByIdQuery = gql `
    query goalDocByIdQuery ($goalDocId: ID) {
      GoalDoc(id: $goalDocId) {
       goal
       id
       steps(orderBy:positionIndex_ASC) {
         step
         positionIndex
         suggestedStep
         id
         originalId
       }
       clonedSteps(orderBy:positionIndex_ASC) {
         step
         positionIndex
         id
         suggestedStep
         originalId
         suggester {
           userName
         }
       }
      }
    }`;

class AddStepSmart extends React.Component {

  constructor(props) {
    super(props)
    this._submitStep = this._submitStep.bind(this);
    this._submitAddStepMutation = this._submitAddStepMutation.bind(this)
    this._submitClonedStepMutation = this._submitClonedStepMutation.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      step: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    // if (!nextProps.data.loading) {
    // if (nextProps.currentGoalSteps.length > this.props.currentGoalSteps.length) {
    //   this._submitAddStepMutation(nextProps)
    // if (nextProps.currentGoalStepsClone.length > this.props.currentGoalStepsClone.length) {
    //   console.log(nextProps.currentGoalStepsClone)
    //   this._submitClonedStepMutation(nextProps)
    // }
    // }
  }

  render() {
    // if (!this.props.data.user) {console.warn('only logged in users can create new posts')}

    //
    // console.log(newStepsSortedByPositionIndex)
    if (this.props.loggedInUserID === this.props.targetUserID) {
      return (<AddStep _submitStep={this._submitStep} handleChange={this.handleChange} value={this.state.step} loggedInUserID={this.props.loggedInUserID}/>)
    }
    return (null)
  }

  _submitStep(event) {
    event.preventDefault()
    const {loading, error, allSteps} = this.props.stepIdQuery

    if (!loading) {
      // actions.setStepAndPositionIndex(this.state.step, this.props.index)
      // actions.setClonedStepAndPositionIndex(this.state.step, this.props.index)
      const newStep = {
        step: this.state.step,
        suggestedStep: false,
        id: null,
        positionIndex: null
      }
      const stepIndex = this.props.stepIndex
      // console.log('allSteps', allSteps)
      const newSteps = allSteps.slice()
      // console.log('newSteps', newSteps)
      newSteps.splice(stepIndex, 0, newStep)
      const newStepsSortedByPositionIndex = newSteps.map((stepObj, index) => ({
        ...stepObj,
        positionIndex: index
      }))
      // console.log('newStepsSortedByPositionIndex', newStepsSortedByPositionIndex )
      this._submitAddStepMutation(newStepsSortedByPositionIndex)
    }
  }
  handleChange(e) {
    this.setState({step: e.target.value});
  }

  _submitAddStepMutation = async (newStepsSortedByPositionIndex) => {
    newStepsSortedByPositionIndex.map(async (stepObj, mapIndex) => {
      let id
      if (!stepObj.id) {
        id = "x"
      } else {
        id = stepObj.id
      }
      const addStepResult = await this.props.updateOrCreateStep({
        variables: {
          goalDocId: this.props.goalDocId,
          step: stepObj.step,
          id: id,
          positionIndex: stepObj.positionIndex,
          suggestedStep: false
        }
      })
      // if (!stepObj.id) {
      //   return this.props.dispatch(actions.setStepIdFromServer(mapIndex, addStepResult.data.updateOrCreateStep.id))
      // }
    })
  }

  _submitClonedStepMutation = (nextProps) => {
    nextProps.currentGoalStepsClone.map(async (stepObj, mapIndex, array) => {
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
          suggesterId: this.props.loggedInUserID
        }
      })
      if (!stepObj.id) {
        return this.props.dispatch(actions.setClonedStepIdFromServer(mapIndex, suggestStepResult.data.updateOrCreateClonedStep.id))
      }
    })
  }

}

const AddStepWithApollo = compose(graphql(UpdateOrCreateStep, {
  props: ({mutate}) => ({
    updateOrCreateStep({variables}) {
      return mutate({
        variables: {
          ...variables
        },
        refetchQueries: ['goalDocByIdQuery']
      }).catch((error) => {
        console.log('there was an error sending the query', error)
      })
    }
  }),
}),
graphql(UpdateOrCreateClonedStep, {
  name: 'updateOrCreateClonedStep',
  props: ({updateOrCreateClonedStep}) => ({
    updateOrCreateClonedStep({variables}) {
      return updateOrCreateClonedStep({
        variables: {
          ...variables
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  })
}), graphql(stepIdQuery, {
  name: "stepIdQuery",
  options: (ownProps) => ({
    variables: {
      id: ownProps.goalDocId
    }
  })
}))(withRouter(AddStepSmart))

const mapStateToProps = (state, props) => {
  return {
    currentGoal: state.goals.currentGoal,
    currentGoalID: state.goals.currentGoalID,
    loggedInUserID: state.goals.loggedInUserID,
    targetUserID: state.goals.targetUserID,
    currentGoalSteps: state.goals.currentGoalSteps,
    currentGoalStepsClone: state.goals.currentGoalStepsClone,
    goalDocID: state.goals.currentGoalID
  }
}

export default connect(mapStateToProps)(AddStepWithApollo)

// const userQuery = gql`
//   query userQuery {
//     user {
//       id
//     }
//   }
// `
