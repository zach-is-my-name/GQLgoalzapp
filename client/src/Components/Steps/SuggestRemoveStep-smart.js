/* eslint-disable */
import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions  from '../../Actions/actions.js'



const updateClonedStepMutation = gql ` mutation updateClonedStep(
  $id: ID!,
  $suggesterId: ID
) {
  clonedStepUpdate(data: {
    id: $id,
    suggestedStep: true,
    suggestRemove: true
    suggester: {connect: {id: $suggesterId}}
  }) {
    id
    positionIndex
    stepsId
    suggestedStep
    step
  }
}
`
const goalDocByIdQuery = gql `query GoalDocByIdQuery ($goalDocId: ID) {
  goalDoc(id: $goalDocId) {
   goal
   id
   steps(orderBy:positionIndex_ASC) {
     items {
     step
     positionIndex
     suggestedStep
     id
    }}
   clonedSteps(orderBy:positionIndex_ASC) {
     items {
     positionIndex
     id
     suggestedStep
     stepsId
     suggestRemove
     suggester {
       id
       userName
     }
    }
   }
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
    if (this.props.loggedInUserId && this.props.loggedInUserId !== this.props.targetUserId) {
      this._suggestRemoveStep()
    }
    return null
    }

_suggestRemoveStep() {
    console.log('SuggestRemoveStep called')
    this.props.updateClonedStep({variables: {
      id: this.props.stepObj.id,
      suggesterId: this.props.loggedInUserId,
      suggestedStep: true,
      suggestRemove: true
    }})
}
}


const WithData = graphql(updateClonedStepMutation, {
  props: ({mutate}) => ({
    updateClonedStep({variables}) {
      return mutate({
        variables: {
          ...variables
        }, refetchQueries: ['goalDocByIdQuery ']
      }).catch((error) => {
        console.error(error)
      })
    }
  })
})(SuggestRemoveStep)

export default (WithData)
