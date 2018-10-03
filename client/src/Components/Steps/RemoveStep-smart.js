/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash'
import {graphql, compose, withApollo} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions.js'

const stepsQuery = gql `
  query stepsQuery ($goalDocId: ID) {
      GoalDoc(id: $goalDocId) {
        goal
        id
        steps(orderBy:positionIndex_ASC) {
          step
          positionIndex
          suggestedStep
          id
          originalId
        }
      }
    }`

const clonedStepsQuery = gql `
    query clonedStepsQuery ($goalDocId: ID) {
      GoalDoc(id: $goalDocId) {
       clonedSteps(orderBy:positionIndex_ASC) {
         step
         positionIndex
         id
         suggestedStep
         originalId
         suggester {
           userName
         }
       }
     }}`

const stepIdQuery = gql `
query stepIdQuery($id:ID) {
  allSteps(filter: {goalDoc: {id: $id}}, orderBy: positionIndex_ASC) {
     id
     positionIndex
     step
   }
 }`

const removeStepMutation = gql `mutation RemoveStepMutation($id: ID!) {
  deleteStep(id: $id) {
    step
  }
}`

const updateStepMutation = gql `mutation UpdateStep($id: ID!, $positionIndex: Int) {
  updateStep(id: $id, positionIndex: $positionIndex) {
    id
    positionIndex
    step
  }
}`

class RemoveStep extends Component {
  constructor(props) {
    super(props)
    this._submitRemoveStepMutation = this._submitRemoveStepMutation.bind(this)
    this._reorderSteps = this._reorderSteps.bind(this)
    }
componentDidMount() {
  this.props.unrenderRemoveStepFunction()
}

  render() {
    if (this.props.renderRemoveStepState === true) {
        this._submitRemoveStepMutation()
    }
      return null
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

  async _submitRemoveStepMutation(nextPropsCurrentGoalSteps) {
      console.log('_submitRemoveStepMutation called')
      const removeStepResult = await this.props.RemoveStepMutation({
        variables: {
          id: this.props.idToRemove
        }
      })
        .catch((error) => {console.log(error)})
      const stepsQueryResult = await this.props.client.query({query:stepsQuery, variables:
         { goalDocId: this.props.goalDocId}, fetchPolicy: 'network-only'
       }).catch((error) =>  console.log(error))

  const _reorderedSteps = await this._reorderSteps(stepsQueryResult)
    await  _reorderedSteps.map(async (stepObj, mapIndex) => {
      await this.props.updateStep({
        variables: {
          id: stepObj.id,
          positionIndex: stepObj.positionIndex
        }
      }).catch((error) => console.log(error))
    })

}
}


const RemoveStepWithMutation = compose(graphql(removeStepMutation, {
  props: ({mutate}) => ({
    RemoveStepMutation({variables}) {
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
graphql(updateStepMutation, {
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
}))(RemoveStep)

// const mapStateToProps = (state, props) => {
//   return ({idToRemove: state.goals.idToRemove})
// }

export default withApollo(RemoveStepWithMutation)
