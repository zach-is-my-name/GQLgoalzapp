/* eslint-disable */
import React, {Component} from 'react'
import {graphql, compose, withApollo} from 'react-apollo';
import gql from 'graphql-tag';

const removeSuggestedStepMutation1 =  gql `mutation RemoveSuggestedStep($id:ID!){
  deleteClonedStep(id: $id) {
    id
    step
  }
}`

const removeSuggestedStepMutation = gql `mutation removeSuggestedStep($id: ID!)  {
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

class RemoveSuggestedStep extends Component {
  constructor(props) {
    super(props)
    this._reorderClonedSteps = this._reorderClonedSteps.bind(this)
    this._submitRemoveSuggestedStep = this._submitRemoveSuggestedStep .bind(this)
}


componentDidMount() {
  this.props.unrenderRemoveSuggestedStepFunction()
}

 render() {
     this._submitRemoveSuggestedStep(this.props.idToRemove)
     return null
}

async _submitRemoveSuggestedStep(idToRemove){
  console.log('_submitRemoveSuggestedStep called')
  await this.props.removeClonedStepMutation({
    variables: {
      id: this.props.idToRemove
    }
  })
  const clonedStepsQueryResult = await this.props.client.query({
    query: clonedStepsQuery,
    variables: {
      goalDocId: this.props.goalDocId
    }, fetchPolicy:'network-only'
  }).catch(error => console.log(error))

 const reorderedClonedSteps = await this._reorderClonedSteps(clonedStepsQueryResult)
  reorderedClonedSteps.map(async stepObj => {
    await this.props.updateClonedStep({
      variables: {
        id: stepObj.id,
        positionIndex: stepObj.positionIndex },
    }).catch(error => console.log(error))
 })
  }

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

}

const WithMutations = compose(graphql(removeSuggestedStepMutation, {
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
        refetchQueries: [`clonedStepsQuery`]
      })
    }
  })
}))(RemoveSuggestedStep)

export default withApollo(WithMutations)
