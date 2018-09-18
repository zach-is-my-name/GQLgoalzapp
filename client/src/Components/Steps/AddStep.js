/* eslint-disable */
import React, {Component} from 'react'
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import {withRouter, Redirect} from 'react-router-dom'
import * as actions from '../../Actions/actions'
import '../../style/AddStep.css'

const StepIdQuery = gql `
query stepIdQuery($id:ID){
  allSteps(
    filter:{goalDoc:{id:$id}}
  )
 {
 id
 originalId
}}`

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

class AddStep extends React.Component {

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

  _submitStep(event) {
    event.preventDefault()
    actions.setStepAndPositionIndex(this.state.step, this.props.index)
    actions.setClonedStepAndPositionIndex(this.state.step, this.props.index)
  }

  handleChange(e) {
    this.setState({step: e.target.value});
  }

  componentWillReceiveProps(nextProps) {
    // if (!nextProps.data.loading) {
    if (nextProps.currentGoalSteps.length > this.props.currentGoalSteps.length) {
      this._submitAddStepMutation(nextProps)
    if (nextProps.currentGoalStepsClone.length > this.props.currentGoalStepsClone.length) {
      console.log(nextProps.currentGoalStepsClone)
      this._submitClonedStepMutation(nextProps)
    }
    }
  }
  render() {
    // if (!this.props.data.user) {console.warn('only logged in users can create new posts')}

    if (this.props.loggedInUserID === this.props.targetUserID) {
      return (<div className="stepinput-form">
        <form onSubmit={this._submitStep}>
          <input type="text" onChange={this.handleChange} placeholder="" value={this.state.step}/>
          <input type="submit" value="Submit Step"/>
        </form>
      </div>)
    }
    return (null)
  }

   _submitAddStepMutation = async (nextProps) =>  {
    nextProps.currentGoalSteps.map(async (stepObj, mapIndex) => {
        let id
        if (!stepObj.id) {
          id = "x"
        } else {
          id = stepObj.id
        }
        const addStepResult = await this.props.updateOrCreateStep({
          variables: {
            goalDocId: this.props.goalDocID,
            step: stepObj.step,
            id: id,
            positionIndex: stepObj.positionIndex,
            suggestedStep: false
          }
        })
        if (!stepObj.id) {
          return this.props.dispatch(actions.setStepIdFromServer(mapIndex, addStepResult.data.updateOrCreateStep.id))
        }
}
)
console.log("reached")
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
        }
      }).catch((error) => {
        console.log('there was an error sending the query', error)
      })
    }
  })
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
}),
graphql(StepIdQuery, {
  options: ({goalDocID}) => ({
    variables: {
      id: goalDocID
    }
  })
})
)(withRouter(AddStep))

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
