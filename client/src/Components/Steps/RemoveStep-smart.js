/* eslint-disable */
import React, {Component} from 'react';
import {graphql, compose, withApollo} from 'react-apollo';
import gql from 'graphql-tag';

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

const stepsQuery = gql `
query stepsQuery($id:ID){
  stepsList(filter: {stepsOfGoalDoc: {id: {equals: $id}}}, sort: {positionIndex: ASC}) {
      items {
        id
        positionIndex
        step
        suggestedStep
      }
    }
  }`

const clonedStepsQuery = gql `
query clonedStepQuery($id: ID) {
  clonedStepsList(filter: {clonedStepsOfGoalDoc: {id: {equals: $id}}}, sort: {positionIndex: ASC}) {
    items {
      positionIndex
      step
      suggestedStep
      id
    }
  }
}
`
const removeStepMutation = gql `mutation removeStepMutation($id: ID)  {
  stepDelete(data: {id: $id}) {
    success
  }
}
`
const updateStepMutation = gql `
mutation updateStep(
  $id: ID!,
  $positionIndex: Int
) {
  stepUpdate(data: {
    id: $id,
    positionIndex: $positionIndex,
  }) {
    id
    positionIndex
    suggestedStep
    step
  }
}
`

const removeClonedStepMutation = gql `mutation removeClonedStepMutation($id: ID)  {
  clonedStepDelete(data: {id: $id}) {
    success
  }
}
`
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
const clonedStepIdByStepsIdQuery = gql `
query allClonedStepsByStepsIdQuery($stepsId: String) {
  clonedStepsList(filter: {stepsId: {equals: $stepsId}}) {
    items {
      id
    }
  }
}
`

class RemoveStep extends Component {
  constructor(props) {
    super(props)
    this._submitRemoveSteps = this._submitRemoveSteps.bind(this)
    this._submitRemoveStepMutation = this._submitRemoveStepMutation.bind(this)
    this._submitRemoveClonedStepMutation = this._submitRemoveClonedStepMutation.bind(this)
    this._reorderSteps = this._reorderSteps.bind(this)
    this._reorderClonedSteps = this._reorderClonedSteps.bind(this)
    }
componentDidMount() {
  this.props.unrenderRemoveStepFunction()
}

  render() {
    // console.log(this.props.stepObj)
    if (this.props.renderRemoveStepState === true) {
        this._submitRemoveSteps(this.props.idToRemove)
    }
      return null
  }

    async _submitRemoveSteps(idToRemove) {
  	        await this._submitRemoveStepMutation(idToRemove)
  	        this._submitRemoveClonedStepMutation(idToRemove)
  	 	  }

  async _submitRemoveStepMutation(idToRemove) {
      const removeStepResult = await this.props.removeStepMutation({
        variables: {
          id: idToRemove
        }
      }).catch((error) => {console.log(error)})

      const stepsQueryResult = await this.props.client.query({
        query: stepsQuery, variables:{
          goalDocId: this.props.goalDocId},
          fetchPolicy: 'network-only'
       }).catch(error =>  console.log(error))

      const reorderedSteps = await this._reorderSteps(stepsQueryResult)
      await reorderedSteps.map(async (stepObj, mapIndex) => {
          await this.props.updateStep({
            variables: {
              id: stepObj.id,
              positionIndex: stepObj.positionIndex
            }
          }).catch(error => console.log(error))
        })
      }

   _reorderSteps(queryResult) {
    const {loading, error} = queryResult
      if (!loading) {

        const newSteps = queryResult.data.stepsList.items.slice()
        return newSteps.map((stepObj, index) => ({
          ...stepObj,
          positionIndex: index
        }))
      }}

  _reorderClonedSteps(queryResult) {
    const {loading, error} = queryResult
      if (!loading) {
        const newSteps = queryResult.data.clonedStepsList.items.slice()
        return newSteps.map((stepObj, index) => ({
          ...stepObj,
          positionIndex: index
        }))
      }
  }

async _submitRemoveClonedStepMutation(stepsIdToRemove){
    let clonedStepIdResult, clonedStepIdToRemove, clonedStepsQueryResult, reorderedClonedSteps
    try {
      clonedStepIdResult = await this.props.client.query({query: clonedStepIdByStepsIdQuery,
        variables: {
          stepsId: stepsIdToRemove,
        },
        fetchPolicy: 'network-only'})
      } catch (error) {
        console.log(error)
      }

  try {
    clonedStepIdToRemove = clonedStepIdResult.data.clonedStepsList.items[0].id
    await this.props.removeClonedStepMutation({
      variables: {
        id: clonedStepIdToRemove
      }
    })
} catch (error) {
  console.log(error)
}
  try {
    clonedStepsQueryResult = await this.props.client.query({query: clonedStepsQuery,
      variables: {
        goalDocId: this.props.goalDocId},
        fetchPolicy: 'network-only'})
      } catch(error) {
            console.log(error)
        }

    try {
    reorderedClonedSteps = await this._reorderClonedSteps(clonedStepsQueryResult)
        await reorderedClonedSteps.map(async(stepObj, mapIndex) => {
          await this.props.updateClonedStep({
            variables: {
              id: stepObj.id,
              positionIndex: stepObj.positionIndex
            }
          })
        })
      } catch(error) {
            console.log(error)
        }
}
}

const RemoveStepWithMutation =
compose(graphql(removeStepMutation, {
  props: ({mutate}) => ({
    removeStepMutation({variables}) {
      return mutate({
        variables: {
          ...variables
        },
        refetchQueries: [`goalDocByIdQuery`]
      }).catch((error) => {
        console.error(error)
      })
    }
  })
}),
graphql(
  updateStepMutation, {
  props: ({mutate}) => ({
    updateStep({variables}) {
      return mutate ({
        variables: {
          ...variables
        },
        refetchQueries: [`goalDocByIdQuery`]
      })
    }
  })
}),
graphql(removeClonedStepMutation, {
  props: ({mutate}) => ({
    removeClonedStepMutation({variables}) {
      return mutate({
        variables: {
          ...variables
        },
        refetchQueries: [`goalDocByIdQuery`]
      }).catch((error) => {
        console.error(error)
      })
    }
  })
}),
graphql(
  updateClonedStepMutation, {
  props: ({mutate}) => ({
    updateClonedStep({variables}) {
      return mutate ({
        variables: {
          ...variables
        },
        refetchQueries: [`goalDocByIdQuery`]
      })
    }
  })
})
)(RemoveStep)

export default withApollo(RemoveStepWithMutation)
