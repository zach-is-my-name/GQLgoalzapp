/* eslint-disable */
import React, {Component} from 'react'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import * as actions from '../../Actions/actions'

import StepInputForm from '../Form/StepInputForm'

export default class StepsInput extends Component {
  constructor(props) {
    super(props)
    this.submitStep = this.submitStep.bind(this);
  }

  submitStep = (values) => {
    event.preventDefault()
    const varStep = values.stepInput

    const mutateArg = {
      updateGoalDoc: {
        steps: varStep,
        id: this.props.currentGoalID
      }
    }
    this.props.mutate({variables: mutateArg}).then(({data}) => {
      console.log('GOT DATA', data);
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    })
    // .then(this.props.dispatch(actions.setStep()))
  }

  render() {

    return (
      <div>
        null
        {/* <StepInputForm onSubmit={this.submitStep}/> */}
      </div>
    )
  }
}
//need to insert step by id
const StepsMutation = gql `mutation root ($varID: ID!, $varStep: String) {
  updateGoalDoc(id: $varID, input: {
    steps: $varStep
  })
    {
      goal
      steps
      id
    }
  }`;

const StepsInputWithMutation = graphql(StepsMutation )(StepsInput)
//not being used currently
const mapStateToProps = (state, props) => {
  return {currentGoal: state.currentGoal, currentGoalID: state.currentGoalID}
}
