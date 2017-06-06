/* eslint-disable */
import React, {Component} from 'react'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import * as actions from '../../Actions/actions'

import StepInputForm from './Form/StepInputForm'

/* CLASS DEFINITION */
 class StepsInput extends React.Component {
  constructor(props) {
    super(props)
    this.submitStep = this.submitStep.bind(this);
  }

/* EVENT HANDLER */
  submitStep = (values) => {
    let step = values.stepInput;
    console.log('STEP INPUT',values.stepInput)
    console.log('ID INPUT', this.props.currentGoalID)
    this.props.createStep(step, this.props.currentGoalID)
        .then(( {data} ) => {
          console.log('DATA SUBMITTED', data);
        /* DISPATCH ACTION */
        this.props.dispatch(actions.setStep(step))
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
const StepsMutation = gql`
  mutation($varStep:String!, $varGoalDocId: ID) {
  createStep(step:$varStep, goalDocId:$varGoalDocId) {
    step
    id
  }
}`

const StepsInputWithMutation = graphql(StepsMutation,
{
    props:({mutate}) => ({
      createStep(step, goalDocId) {
        return mutate({
          variables: {varStep: step, varGoalDocId: goalDocId }
        })
        .catch((error) => {
          console.log('there was an error sending the query', error)
        })
      }
    })
})(StepsInput)

/* REDUX */
const mapStateToProps = (state, props) => {
  return {currentGoal: state.goals.currentGoal, currentGoalID: state.goals.currentGoalID}
}

const StepInputWithState = connect(mapStateToProps)(StepsInputWithMutation)
export default StepInputWithState
