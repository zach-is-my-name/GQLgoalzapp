/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions  from '../../Actions/actions.js'
class SuggestRemoveStep extends Component {

  render() {
    console.log('Suggest Remove Rendered')
    this.props.suggestRemoveStep({
      variables: {
        id: this.props.id
      }
    }).then(({data}) => {
    this.props.dispatch(actions.suggestRemoveStep(this.props.indexToRemove))
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

export default connect()(SuggestRemoveStepWithMutation)
