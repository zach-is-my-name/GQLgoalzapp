/* eslint-disable */
import React, {Component} from 'react'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom'
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
    const id = this.props.currentGoalID
    const ownersId = this.props.currentGoalOwnerID
    console.log('STEP INPUT',values.stepInput)
    console.log('ID INPUT', this.props.currentGoalID)
    this.props.createStep({variables: {step, id, ownersId}})
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
  mutation($step:String!, $id: ID) {
  updateGoalDoc(step:$step, goalDocId:$id, ownersId:$ownersId) {
    step
    id
  }
}`

const userQuery = gql`
  query userQuery {
    user {
      id
    }
  }
`


/* REDUX */
const mapStateToProps = (state, props) => {
  return {currentGoal: state.goals.currentGoal, currentGoalID: state.goals.currentGoalID,
  currentGoalOwnerID: state.goals.currentGoalOwnerID}
}

const StepsInputWithMutation =graphql(userQuery,
  {options: {fetchPolicy: 'network-only'}})
(graphql(StepsMutation,{
    props:({mutate}) => ({
      createStep({variables}) {
        return mutate({
          variables: {...variables }
        })
        .catch((error) => {
          console.log('there was an error sending the query', error)
        })
      }
    })
})(withRouter(StepsInput)))

export default connect(mapStateToProps)(StepsInputWithMutation)
