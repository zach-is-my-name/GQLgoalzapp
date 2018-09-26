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

 const clonedStepIdQuery = gql `
 query clonedStepIdQuery($id:ID){
   allClonedSteps(filter: {goalDoc: {id: $id}}, orderBy: positionIndex_ASC) {
      id
      positionIndex
      step
      suggestedStep

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

const UpdateOrCreateClonedStep = gql `mutation updateOrCreateClonedStepMutation ($goalDocId: ID, $id: ID!, $positionIndex: Int!, $step: String!, $suggestedStep: Boolean!, $suggesterId: ID) {
    updateOrCreateClonedStep(create: {goalDocId: $goalDocId,
    positionIndex: $positionIndex,
    step: $step, suggestedStep:$suggestedStep  }, update: {goalDocId: $goalDocId, positionIndex:
    $positionIndex, id: $id, suggesterId: $suggesterId, suggestedStep:$suggestedStep}) {
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
    this._reorderSteps = this._reorderSteps.bind(this)
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
    if (this.props.loggedInUserID === this.props.targetUserID) {
      return (<AddStep _submitStep={this._submitStep} handleChange={this.handleChange} value={this.state.step} loggedInUserID={this.props.loggedInUserID}/>)
    }
    return (null)
  }

  handleChange(e) {
    this.setState({step: e.target.value});
  }

async  _submitStep(event) {
    event.preventDefault()
    const {loading, error, allSteps} = this.props.stepIdQuery

    // console.log(this._reorderSteps(this.props.stepIdQuery))
    await  this._submitAddStepMutation(this._reorderSteps(this.props.stepIdQuery))
      this._submitClonedStepMutation(this._reorderSteps(this.props.clonedStepIdQuery))
  }

  _reorderSteps(queryResult) {
    const {loading, error} = queryResult
    if (!loading) {
    let allSteps
    if (queryResult === this.props.stepIdQuery) {
      allSteps = this.props.stepIdQuery.allSteps
  } else if (queryResult === this.props.clonedStepIdQuery) {
      allSteps = this.props.clonedStepIdQuery.allClonedSteps
  }
      // console.log(allSteps)
      // actions.setStepAndPositionIndex(this.state.step, this.props.index)
      // actions.setClonedStepAndPositionIndex(this.state.step, this.props.index)
      const newStep = {
        step: this.state.step,
        suggestedStep: false,
        id: null,
        positionIndex: null
      }
      const stepIndex = this.props.stepIndex
      const newSteps = allSteps.slice()
      newSteps.splice(stepIndex, 0, newStep)
      return  newSteps.map((stepObj, index) => ({
        ...stepObj,
        positionIndex: index
      }))
    }
  }

  // _reorderClonedSteps() {
  //   const {loading, error, allSteps} = this.props.clonedStepIdQuery
  //   if (!loading) {
  //     // actions.setStepAndPositionIndex(this.state.step, this.props.index)
  //     // actions.setClonedStepAndPositionIndex(this.state.step, this.props.index)
  //     const newStep = {
  //       step: this.state.step,
  //       suggestedStep: false,
  //       id: null,
  //       positionIndex: null
  //     }
  //     const stepIndex = this.props.stepIndex
  //     const newSteps = allSteps.slice()
  //     newSteps.splice(stepIndex, 0, newStep)
  //     const newStepsSortedByPositionIndex = newSteps.map((stepObj, index) => ({
  //       ...stepObj,
  //       positionIndex: index
  //     }))
  //   }
  // }
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

  _submitClonedStepMutation = (newClonedStepsSortedByPositionIndex) => {
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
        }
      })
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
        console.log(error)
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
}),
 graphql(clonedStepIdQuery, {
  name: "clonedStepIdQuery",
  options: (ownProps) => ({
    variables: {
      id: ownProps.goalDocId
    }
  })
})
)(withRouter(AddStepSmart))

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
