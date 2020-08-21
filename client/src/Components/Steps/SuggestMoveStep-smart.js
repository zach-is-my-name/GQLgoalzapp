/* eslint-disable */
import React, {Component} from 'react'
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'

const updateClonedStepMutation = gql ` mutation updateClonedStep(
  $id: ID!,
  $positionIndex: Int,
) {
  clonedStepUpdate(data: {
    id: $id,
    positionIndex: $positionIndex,
  }) {
    id
    positionIndex
    stepsId
    suggestedStep
    step
  }
}
`
const suggestMoveMutation = gql `
  mutation SuggestMoveStep($id: ID!,  $suggesterId: ID) {
    clonedStepUpdate(data: {
      id: $id,
      suggestedStep: true,
      suggestMove: true,
      suggester:{connect: {id: $suggesterId} }} )

      {
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
     suggester {
       id
       userName
     }
    }
   }
  }
}`


class SuggestMoveStep extends Component {
  constructor(props) {
    super(props)
    this._submitMoveClonedStepMutation = this._submitMoveClonedStepMutation.bind(this)
    this._reorderClonedSteps = this._reorderClonedSteps.bind(this)
  }

  componentDidMount() {
    this.props._unrenderMoveStep()
    //unrender
  }

  render() {
    this._submitMoveClonedStepMutation(this._reorderClonedSteps())
    return null
  }

  _reorderClonedSteps() {
    const oldSteps = this.props.clonedSteps.slice()
    const newSteps = oldSteps.map((stepObj, index) => ({
        ...stepObj,
        positionIndex: index,
    }))
    return newSteps
  }

  async _submitMoveClonedStepMutation(newClonedStepsSortedByPositionIndex) {
    const clonedSteps = this.props.clonedSteps
    const newIndex = this.props.newIndex
    const id = clonedSteps[newIndex].id

     const suggestMoveMutationResult = await this.props.suggestMoveMutation({
      variables: {
        id: id,
        suggesterId: this.props.loggedInUserId,
      }
    })

    newClonedStepsSortedByPositionIndex.map(async stepObj => {
      await this.props.updateClonedStep({
        variables: {
          id: stepObj.id,
          positionIndex: stepObj.positionIndex
        }
      })
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
