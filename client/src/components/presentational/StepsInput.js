/* eslint-disable */
import React, {Component} from 'react'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import * as actions from '../../Actions/actions'

import StepInputForm from '../Form/StepInputForm'

/* CLASS DEFINITION */
 class StepsInput extends React.Component {
  constructor(props) {
    super(props)
    this.submitStep = this.submitStep.bind(this);
  }



/* EVENT HANDLER */
  submitStep = (values) => {
    let step = values.stepInput;
    console.log(values.stepInput)
    this.props.mutate({variables:{varStep: step, varID: this.props.currentGoalID }})
    .then(({data}) => {
      console.log('GOT DATA STEP INPUT', data);
        this.props.dispatch(actions.setSteps(step))
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    })
}

/* RENDER METHOD */
  render() {

    return (
        <StepInputForm onSubmit={this.submitStep}/>
    )
  }
}



/* GRAPHQL QUERY */
const StepsMutation = gql `mutation root ($varID: ID!, $varStep: String) {
  updateGoalDoc(id: $varID, input: {
    steps: $varStep
  })
    {
      goal
      steps
      id
    }
  }`

const StepsInputWithMutation = graphql(StepsMutation)(StepsInput)

/* REDUX */
const mapStateToProps = (state, props) => {
  return {currentGoal: state.goals.currentGoal, currentGoalID: state.goals.currentGoalID}
}

const StepInputWithState = connect(mapStateToProps)(StepsInputWithMutation)
export default StepInputWithState
