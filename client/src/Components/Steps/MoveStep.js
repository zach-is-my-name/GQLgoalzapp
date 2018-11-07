/* eslint-disable */
import React, {Component} from 'react'
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag'

const updateStepMutation = gql`
  mutation MoveStep($id: ID!, $positionIndex: Int) {
    updateStep(id: $id, positionIndex: $positionIndex) {
    id
    positionIndex
    step
  }
}`

const updateClonedStepMutation = gql `mutation MoveClonedStep($id:ID!, $positionIndex: Int) {
  updateClonedStep(id: $id, positionIndex: $positionIndex) {
    id
    positionIndex
    step
  }
}`

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

const  allClonedStepsQuery = gql `
 query allClonedStepsQuery($goalDocId:ID){
   allClonedSteps(filter: {goalDoc: {id: $goalDocId}}, orderBy: positionIndex_ASC) {
      id
      positionIndex
      step
      suggestedStep

    }
  }`
class MoveStep extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stepIds: []
    }
    this._reorderSteps = this._reorderSteps.bind(this)
    this._submitMoveStep = this._submitMoveStep.bind(this)
    this._submitMoveStepMutation = this._submitMoveStepMutation.bind(this)
    this._submitMoveClonedStepMutation = this._submitMoveClonedStepMutation.bind(this)
    this._reorderClonedSteps = this._reorderClonedSteps.bind(this)
  }



componentDidMount() {
  this.props._unrenderMoveStep()
  //unrender
}

render() {
  this._submitMoveStep(this._reorderSteps())
  return null
}

async _submitMoveStep() {
  await this._submitMoveStepMutation(this._reorderSteps())
  await this._submitMoveClonedStepMutation(this._reorderClonedSteps())
}

_submitMoveStepMutation(newStepsSortedByPositionIndex) {
  newStepsSortedByPositionIndex.map(async stepObj => {
  const updateStepResult =  await this.props.updateStep({
      variables: {
        id: stepObj.id,
        positionIndex: stepObj.positionIndex
      }
    })
    // console.log("updateStepResult",updateStepResult)
  })
}

  _reorderSteps(queryResult) {
    // const {loading, error} = queryResult
    // if (!loading) {
      const newSteps = this.props.steps.slice()

      return  newSteps.map((stepObj, index) => ({
        ...stepObj,
        positionIndex: index
      }))
    // }
  }

_reorderClonedSteps() {
  const clonedSteps = this.props.clonedSteps
  const newIndex = this.props.newIndex
  const oldIndex = this.props.oldIndex
  let oldSteps = this.props.clonedSteps.slice()
       console.log('oldSteps', oldSteps)
       console.log('oldIndex', oldIndex)
       console.log(oldSteps[oldIndex])

  console.log('clonedSteps', clonedSteps)
  if (clonedSteps[oldIndex].suggestedStep === false) {
       oldSteps[oldIndex].positionIndex= newIndex
       // console.log('oldSteps[oldIndex].positionIndex= newIndex', oldSteps[oldIndex].positionIndex)
      const newSteps = oldSteps.sort((a,b) => {
          if (a.positionIndex === b.positionIndex && b.suggestedStep) {
            console.log("a.positionIndex === b.positionIndex && b.suggestedStep")
              return 1
          }

          if (a.positionIndex === b.positionIndex && a.suggestedStep) {
            console.log("a.positionIndex === b.positionIndex && a.suggestedStep")
              return 1
          }

          if (a.positionIndex === b.positionIndex && !a.suggestedStep && !b.suggestedStep ) { console.log("a.positionIndex === b.positionIndex && !a.suggestedStep && !b.suggestedStep")
              return 1
          }

        if (a.positionIndex > b.positionIndex) {
          console.log("a.positionIndex > b.positionIndex")
          return 1
        }
          if (a.positionIndex < b.positionIndex) {
            console.log("a.positionIndex < b.positionIndex1")
            return -1
          }
          console.log("Return 0")
          return 0
        })
          console.log('newSteps', newSteps)
          return newSteps.map((stepObj, index) => ({
              ...stepObj,
              positionIndex: index,
          })
          )
      } else {
        return false
  }
}

_submitMoveClonedStepMutation(newClonedStepsSortedByPositionIndex) {
  console.log('newClonedStepsSortedByPositionIndex', newClonedStepsSortedByPositionIndex)
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
  // console.log("updateClonedStepResult",updateClonedStepResult)
})
}


}

const WithMutation = compose(graphql(updateStepMutation, {
  props: ({mutate}) => ({
    updateStep({variables}) {
      return mutate ({
        variables: {
          ...variables
        },
        })
    }
  })
}),
graphql(updateClonedStepMutation, {
  props: ({mutate}) => ({
    updateClonedStep({variables}) {
      return mutate ({
        variables: {
          ...variables
        }, refetchQueries: ['goalDocByIdQuery', 'allClonedStepsQuery']
      })
    }
  })
})
)(MoveStep)

export default WithMutation
