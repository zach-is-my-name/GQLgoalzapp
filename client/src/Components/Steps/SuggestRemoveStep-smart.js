/* eslint-disable */
import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions  from '../../Actions/actions.js'


const updateClonedStepMutation1 = gql `
  mutation SuggestRemoveClonedStepMutation( $id: ID!) {
    updateClonedStep(id: $id, suggestedStep: true, suggestRemove: true) {
      id
      step
      suggestedStep
      suggestRemove
    }
  }`

const updateClonedStepMutation = gql ` mutation updateClonedStep(
  $id: ID!,
  $step: step
  $suggestedStep: Boolean,
  $positionIndex: Int,
  $stepsId: String,
) {
  clonedStepUpdate(data: {
    id: $id,
    positionIndex: $positionIndex,
    stepsId: $stepsId,
    suggestedStep: $suggestedStep,
    suggestRemove: true
  }) {
    id
    positionIndex
    stepsId
    suggestedStep
    step
  }
}
`

// const suggestRemoveStep = gql `mutation suggestRemoveStepMutation($id: ID!) {
//   deleteClonedStep(id: $id) {
//     step
//   }
// }`

class SuggestRemoveStep extends Component {
  constructor(props) {
    super(props)
    this._suggestRemoveStep = this._suggestRemoveStep.bind(this)
  }

componentDidMount() {
    this.props.unrenderSuggestRemoveStepFunction()
}


  render() {
    // console.log('SuggestRemove Rendered')
    console.log(this.props)
    if (this.props.loggedInUserId && this.props.loggedInUserId !== this.props.targetUser) {
      this._suggestRemoveStep()
    } else if (!this.props.loggedInUser) {
      // TODO check if user owns clonedSteps; prompt log-in or create user;  if true, resolve action; if false, onboard and give fresh clonedSteps
      return null
    }
    return null
  }

_suggestRemoveStep() {
    console.log('SuggestRemoveStep called')
    this.props.updateClonedStep({variables: {
      id: this.props.stepObj.id
    }})
}
}


const WithData = graphql(updateClonedStepMutation, {
  props: ({mutate}) => ({
    updateClonedStep({variables}) {
      return mutate({
        variables: {
          ...variables
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  })
})(SuggestRemoveStep)

export default (WithData)
