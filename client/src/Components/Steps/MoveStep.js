/* eslint-disable */
import React, {Component} from 'react'
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'
import arrayMove from 'array-move'

const updateStepMutation =  gql `
mutation updateStep(
  $id: ID!,
  $suggestedStep: Boolean,
  $positionIndex: Int
) {
  stepUpdate(data: {
    id: $id,
    positionIndex: $positionIndex,
    suggestedStep: $suggestedStep
  }) {
    id
    positionIndex
    suggestedStep
    step
  }
}`

const updateClonedStepMutation = gql ` mutation updateClonedStep(
  $id: ID!,
  $suggestedStep: Boolean,
  $positionIndex: Int,
  $stepsId: String,
) {
  clonedStepUpdate(data: {
    id: $id,
    positionIndex: $positionIndex,
    stepsId: $stepsId,
    suggestedStep: $suggestedStep
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
     suggester {
       id
       userName
     }
    }
   }
  }
}`

class MoveStep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stepIds: [],

    }
    this._reorderSteps = this._reorderSteps.bind(this)
    this._submitMoveStep = this._submitMoveStep.bind(this)
    this._submitMoveStepMutation = this._submitMoveStepMutation.bind(this)
    this._submitMoveClonedStepMutation = this._submitMoveClonedStepMutation.bind(this)
    this._reorderClonedSteps = this._reorderClonedSteps.bind(this)
  }

  componentDidMount() {
  this.props._unrenderMoveStep()
}

  componentDidUpdate(prevProps) {
    if (this.props.steps !== prevProps.steps) {}
  }

  render() {
    this._submitMoveStep()
    return null
  }

  async _submitMoveStep() {
    await this._submitMoveStepMutation(this._reorderSteps())
    await this._submitMoveClonedStepMutation(this._reorderClonedSteps())
}

  _submitMoveStepMutation(newStepsSortedByPositionIndex) {
    newStepsSortedByPositionIndex.map(async stepObj => {
      const updateStepResult = await this.props.updateStep({
        variables: {
          id: stepObj.id,
          positionIndex: stepObj.positionIndex
        }
      }).catch(error => console.log(error))
    })
  }

  _reorderSteps() {
    const newSteps = this.props.steps.slice()

    return newSteps.map((stepObj, index) => ({
      ...stepObj,
      positionIndex: index
    }))
  }

  _reorderClonedSteps() {
    const clonedSteps = this.props.clonedSteps
    const newIndex = this.props.newIndex
    const oldIndex = this.props.oldIndex
    let oldSteps = this.props.clonedSteps.slice()
    console.log('oldIndex', oldIndex)
    console.log('newIndex', newIndex)

    if (clonedSteps[oldIndex] && clonedSteps[oldIndex].suggestedStep === false) {
      oldSteps = arrayMove(oldSteps, oldIndex, newIndex).map((stepObj, index) => ({...stepObj, positionIndex:index }))

      const newSteps = oldSteps.sort((a, b) => {
        if (a.positionIndex === b.positionIndex && b.suggestedStep) {
          console.log("a.positionIndex === b.positionIndex && b.suggestedStep")
          return 1
        }

        if (a.positionIndex === b.positionIndex && a.suggestedStep) {
          console.log("a.positionIndex === b.positionIndex && a.suggestedStep")
          return 1
        }

        if (a.positionIndex === b.positionIndex && !a.suggestedStep && !b.suggestedStep) {
          console.log("a.positionIndex === b.positionIndex && !a.suggestedStep && !b.suggestedStep")
          return 1
        }

        if (a.positionIndex > b.positionIndex) {
          console.log("a.positionIndex > b.positionIndex")
          return 1
        }
        if (a.positionIndex < b.positionIndex) {
          // console.log("a.positionIndex < b.positionIndex1")
          return -1
        }
        // console.log("Return 0")
        return 0
      })
      return newSteps.map((stepObj, index) => ({
        ...stepObj,
        positionIndex: index
      }))
    if (oldSteps !== newSteps) {
      console.log('oldSteps', oldSteps)
      console.log('newSteps', newSteps)
    }
    } else {
      console.log('moveStep returned false')
      return false
    }
  }

  _submitMoveClonedStepMutation(newClonedStepsSortedByPositionIndex) {
    if (newClonedStepsSortedByPositionIndex === false) {
      return
    }
    newClonedStepsSortedByPositionIndex.map(async stepObj => {
      const updateClonedStepResult = await this.props.updateClonedStep({
        variables: {
          id: stepObj.id,
          positionIndex: stepObj.positionIndex
        }
      })
    })

}

}

const WithMutation = compose(graphql(updateStepMutation, {
  props: ({mutate}) => ({
    updateStep({variables}) {
      return mutate({
        variables: {
          ...variables
        }
      })
    }
  })
}), graphql(updateClonedStepMutation, {
  props: ({mutate}) => ({
    updateClonedStep({variables}) {
      return mutate({
        variables: {
          ...variables
        },
        refetchQueries: ['goalDocByIdQuery']
      })
    }
  })
}))(MoveStep)

export default WithMutation
