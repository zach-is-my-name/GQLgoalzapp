/* eslint-disable */
import React, {Component} from 'react';
import {graphql, compose, withApollo} from 'react-apollo';
import gql from 'graphql-tag';

const stepsQuery1 = gql `
  query stepsQuery ($goalDocId: ID) {
      GoalDoc(id: $goalDocId) {
        goal
        id
        steps(orderBy:positionIndex_ASC) {
          step
          positionIndex
          suggestedStep
          id
        }
      }
    }`
const stepsQuery = gql `
query stepsQuery($id:ID){
  stepsList(filter: {goalDoc: {id: {equals: $Id}}}, sort: {step: ASC}) {
      items {
        id
        positionIndex
        step
        suggestedStep
      }
    }
  }`


const clonedStepsQuery1 = gql `
    query clonedStepsQuery ($goalDocId: ID) {
      GoalDoc(id: $goalDocId) {
        id
       clonedSteps(orderBy:positionIndex_ASC) {
         step
         positionIndex
         id
         suggestedStep
         stepsId
         suggester {
           id
           userName
         }
       }
     }}`

const clonedStepsQuery = gql `
query clonedStepQuery($id: ID) {
  clonedStepsList(filter: {clonedStepsOfGoalDoc: {id: {equals: $id}}}, sort: {step: ASC}) {
    items {
      positionIndex
      step
      suggestedStep
      id
    }
  }
}
`

const removeStepMutation1 = gql `mutation RemoveStepMutation($id: ID!) {
  deleteStep(id: $id) {
    step
  }
}`

const removeStepMutation = gql `mutation removeStepMutation($id: ID)  {
  stepDelete(data: {id: $id}) {
    success
  }
}
`
const updateStepMutation1 =  gql `
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

const updateStepMutation = gql `mutation updateStep($id: ID!, $positionIndex: Int) {
  updateStep(id: $id, positionIndex: $positionIndex) {
    id
    positionIndex
    step
  }
}`

const removeClonedStepMutation1 = gql `mutation RemoveClonedStepMutation($id: ID!) {
  deleteClonedStep(id: $id) {
    step
  }
}`

const removeClonedStepMutation = gql `mutation removeClonedStepMutation($id: ID)  {
  clonedStepDelete(data: {id: $id}) {
    success
  }
}
`

const updateClonedStepMutation1 = gql `mutation UpdateClonedStep($id: ID!, $positionIndex: Int) {
  updateClonedStep(id: $id, positionIndex: $positionIndex) {
    id
    positionIndex
    step
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
	const clonedStepIdByStepsIdQuery1 = gql `
    query allClonedStepsByStepsIdQuery ($stepsId: String){
      allClonedSteps(filter: { stepsId: $stepsId}){
	      id
	    }
	  } `

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
    console.log(this.props.stepObj)
    if (this.props.renderRemoveStepState === true) {
        this._submitRemoveSteps(this.props.idToRemove)
        // this._submitRemoveStepMutation()
    }
      return null
  }

    async _submitRemoveSteps(idToRemove) {
  	        await this._submitRemoveStepMutation(idToRemove)
  	        this._submitRemoveClonedStepMutation(idToRemove)
  	 	  }

  async _submitRemoveStepMutation(idToRemove) {
        console.log('idToRemove', idToRemove)
        // console.log('_submitRemoveStepMutation called')
      const removeStepResult = await this.props.removeStepMutation({
        variables: {
          id: idToRemove
        }
      }).catch((error) => {console.log(error)})

      const stepsQueryResult = await this.props.client.query({
        query:stepsQuery, variables:{
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

        const newSteps = queryResult.data.GoalDoc.steps.slice()
        return newSteps.map((stepObj, index) => ({
          ...stepObj,
          positionIndex: index
        }))
      }}

  _reorderClonedSteps(queryResult) {
    const {loading, error} = queryResult
      if (!loading) {
        const newSteps = queryResult.data.GoalDoc.clonedSteps.slice()
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
    clonedStepIdToRemove = clonedStepIdResult.data.allClonedSteps[0].id
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
        // refetchQueries: [`stepsQuery`]
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
        refetchQueries: [`stepsQuery`]
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
        // refetchQueries: [`stepsQuery`]
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
        refetchQueries: [`stepsQuery`]
      })
    }
  })
})
)(RemoveStep)

// const mapStateToProps = (state, props) => {
//   return ({idToRemove: state.goals.idToRemove})
// }

export default withApollo(RemoveStepWithMutation)
