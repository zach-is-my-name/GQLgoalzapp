/* eslint-disable */
import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions  from '../../Actions/actions.js'


const updateClonedStepMutation = gql `
  mutation UpdateClonedStepMutation( $id: ID!) {
    updateClonedStep(id: $id, suggestedStep: true, suggestRemove: true) {
      id
      step
      suggestedStep
      suggestRemove
    }
  }`

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
    this._suggestRemoveStep()
    return null
  }

_suggestRemoveStep() {
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
