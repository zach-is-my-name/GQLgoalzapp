/* eslint-disable */
import React, {Component} from 'react'
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'

const updateClonedStepMutation = gql `
  mutation SuggestMoveStep($id: ID!, $positionIndex: Int) {
    updateClonedStep(id: $id, positionIndex: $positionIndex, ) {
      id
      positionIndex
      step
    }
  }
`
const suggestMoveMutation = gql `
  mutation SuggestMoveStep($id: ID!) {
    updateClonedStep(id: $id, suggestMove: true ) {
      id
      positionIndex
      step
      suggestMove
    }
  }
`

const goalDocByIdQuery = gql `
    query goalDocByIdQuery ($goalDocId: ID) {
      GoalDoc(id: $goalDocId) {
       goal
       id
       steps(orderBy:positionIndex_ASC) {
         step
         positionIndex
         suggestedStep
         id
       }
       clonedSteps(orderBy:positionIndex_ASC) {
         step
         positionIndex
         id
         suggestedStep
         stepsId
         suggester {
           userName
         }
       }
      }
    }`;
class SuggestMoveStep extends Component {
  constructor(props) {
    super(props)
    this._submitMoveClonedStepMutation = this._submitMoveClonedStepMutation.bind(this)
    this._reorderClonedSteps = this._reorderClonedSteps.bind(this)
    this._suggestedStepMutation = this._suggestedStepMutation.bind(this)
}
componentDidMount() {
  this.props._unrenderMoveStep()
  //unrender
}

render() {
  this._submitMoveClonedStepMutation(this._reorderClonedSteps())
  return null
}

async _submitMoveClonedStepMutation(newClonedStepsSortedByPositionIndex) {
  await this._suggestedStepMutation()
  newClonedStepsSortedByPositionIndex.map(async stepObj => {
    await this.props.updateClonedStep({
      variables: {
        id: stepObj.id,
        positionIndex: stepObj.positionIndex
      }
    })
  })
}

_reorderClonedSteps() {
  const oldSteps = this.props.clonedSteps.slice()
  const newSteps = oldSteps.map((stepObj, index) => ({
      ...stepObj,
      positionIndex: index
  }))
  return newSteps
}


_suggestedStepMutation() {
  const clonedSteps = this.props.clonedSteps
  const newIndex = this.props.newIndex
  const id = clonedSteps[newIndex].id
  this.props.suggestMoveMutation({
    variables: {
      id: id
    }
  })
}
}
const WithData = compose(graphql(updateClonedStepMutation, {
  props: ({mutate}) => ({
    updateClonedStep({variables}) {
      return mutate ({
        variables: {
          ...variables
        }, refetchQueries: ['goalDocByIdQuery']
      })
    }
  })
}), graphql(suggestMoveMutation, {
  props: ({mutate}) => ({
    suggestMoveMutation({variables}) {
      return mutate ({
        variables: {
          ...variables
        }
      })
    }
  })
}))(SuggestMoveStep)

export default WithData