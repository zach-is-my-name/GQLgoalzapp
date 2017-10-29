import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions'

class AcceptStep extends Component {
  constructor(props) {
    super(props)
  }

// componentWillReceiveProps(nextProps) {
// if (this.props !== nextProps) {
// }
// }

render() {
  console.log('this.props.goalDocId', this.props.goalDocId)
  this.props.createStep({variables: {step: this.props.step, goalDocId: this.props.goalDocId, positionIndex: this.props.positionIndex, suggestedStep: false}}).then(({data}) => {
    console.log('mutation sent', data)
  })
  this.props.deleteClonedStep({variables: {id: this.props.stepId }}).then(({data}) => {
    console.log('mutation sent', data)
  })
  return <div><p>Step Accepted!</p></div>
}
}

const AcceptStepMutation = gql `
mutation($step:String!, $positionIndex:Int, $suggestedStep: Boolean, $goalDocId: ID){
  createStep(step: $step, positionIndex: $positionIndex, suggestedStep: $suggestedStep, goalDocId: $goalDocId) {
    id
    step
  }}`

const RemoveClonedStep = gql `
mutation($id: ID!){
  deleteClonedStep(id: $id) {
    id
  }}`


const AcceptStepWithMutation =
compose(
  graphql(AcceptStepMutation,
  {
    props: ({mutate}) => ({
      createStep({variables}) {
        return mutate({
          variables: {...variables}
        })
        .catch((error) => {
          console.log('there was an error sending the mutation', error)
        })
      }
    })
}),
graphql(RemoveClonedStep,
{
  props:({mutate}) => ({
    deleteClonedStep({variables}) {
      return mutate({
        variables: {...variables}
      })
      .catch((error) => {
        console.log('there was an error sending the mutation', error)
      })
    }
  })
})
)(AcceptStep)

export default connect()(AcceptStepWithMutation)
