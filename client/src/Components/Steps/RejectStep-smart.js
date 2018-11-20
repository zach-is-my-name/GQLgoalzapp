/* eslint-disable */
import React, {Component} from 'react'
import {graphql, compose, withApollo} from 'react-apollo';
import gql from 'graphql-tag';


const clonedStepsQuery = gql `
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

const removeClonedStepMutation = gql `
  mutation RemoveClonedStepMutation($id: ID!) {
  deleteClonedStep(id: $id) {
    step
    id
  }
}`

const updateClonedStepMutation = gql `mutation UpdateClonedStep($id: ID!, $positionIndex: Int) {
  updateClonedStep(id: $id, positionIndex: $positionIndex) {
    id
    positionIndex
    step
  }
}`

class RejectStep extends Component {
  constructor(props) {
    super(props)
    this._reorderClonedSteps = this._reorderClonedSteps.bind(this)
    this._submitRejectStepMutation = this._submitRejectStepMutation.bind(this)
  }

  componentDidMount() {
    this.props.unrenderRejectStepFunction()
  }

render() {
  console.log('Component Rendered')
  console.log(this.props)
  if (this.props.renderRejectStepState === true) {
    console.log(this.props.renderRejectStep)
    this._submitRejectStepMutation(this.props.idToRemove)
  }
  return null
}

async _submitRejectStepMutation(idToRemove) {
  let rejectStepResult, clonedStepsQueryResult, reorderedClonedSteps
  try {
    rejectStepResult = await this.props.removeClonedStepMutation({
      variables: {
        id: this.props.idToRemove
      }
    })
    } catch(error) {
      console.log(error) }
  try {
    clonedStepsQueryResult = await this.props.client.query({
    query: clonedStepsQuery, variables : {
      goalDocId: this.props.goalDocId},
      fetchPolicy: 'network-only'
  })
  } catch(error) {
    console.log(error)
  }

  try {
     reorderedClonedSteps = await this._reorderClonedSteps(clonedStepsQueryResult)
      }
    catch (error) {console.log(error)}

  try {
    await reorderedClonedSteps.map(async (stepObj, mapIndex) => {
        await this.props.updateClonedStep({
          variables: {
            id: stepObj.id,
            positionIndex: stepObj.positionIndex
          }
        })
      })
  } catch (error) {
      console.log(error)
    }
}

  _reorderClonedSteps(queryResult) {
   const {loading, error} = queryResult
   if (!loading) {
     const newSteps = queryResult.data.GoalDoc.clonedSteps.slice()
     return newSteps.map((stepObj, index) => ({
       ...stepObj,
       positionIndex: index,
     }))
   }
 }
}


const RejectStepWithMutation =
compose(graphql(removeClonedStepMutation, {
  props: ({mutate}) => ({
    removeClonedStepMutation({variables}) {
      return mutate({
        variables: {
          ...variables
        },
        refetchQueries: ['clonedStepsQuery']
      })
    }
  })
}),
graphql(
  updateClonedStepMutation, {
    props: ({mutate}) => ({
      updateClonedStep({variables}) {
        return mutate({
          variables: {
          ...variables
      },
      refetchQueries: [`clonedStepQuery`]
        })
      }
    })
})
)(RejectStep)

export default withApollo(RejectStepWithMutation)
