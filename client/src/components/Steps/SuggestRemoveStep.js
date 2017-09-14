import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';

class SuggestRemoveStep extends Component {

  render() {
    this.props.suggestRemoveStep({
      variables: {
        id: this.props.id
      }
    })
    return null
  }
}
const suggestRemoveStep = gql `mutation($id: ID!) {
  deleteClonedStep(id: $id) {
    step
  }
}`

const SuggestRemoveStepWithMutation = graphql(suggestRemoveStep, {
  props: ({mutate}) => ({
    suggestRemoveStep({variables}) {
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

export default SuggestRemoveStepWithMutation
