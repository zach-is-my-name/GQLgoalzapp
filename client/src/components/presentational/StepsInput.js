import React, {Component} from 'react'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {connect} from 'react-redux';
import * as actions from '../../Actions/actions'

import StepInputForm form '../Form/StepInputForm'

class StepsInput extends Component {

render() {
submitStep = (values) => {
  event.preventDefault()
  const varStep = values.stepInput

  const mutateArg =  {varGoaldoc: {step: varStep, id: this.props.currentGoalID}}
     this.props.mutate({variables: mutateArg})
    .then(({data}) => {
      console.log('GOT DATA', data);
    }).catch((error) => {
      console.log('there was an error sending the query', error);
    })
      .then(this.props.dispatch(actions.setStep(varGoaldoc)))
    }
return(
  <StepInputForm onSubmit={this.submitStep}/>
)


}

}
//need to insert step by id
const StepsInputWithData = graphql (gql`
    mutation ($varGoaldoc: GoalDocInput) {
  createGoalDoc(input: $varGoaldoc) {
    steps,
    id
  }
}
`)(StepsInput);

//not being used currently
const mapStateToProps = (state, props) => {
  return {
    currentGoal: state.currentGoal,
    currentGoalID: state.currentGoalID,
  }
