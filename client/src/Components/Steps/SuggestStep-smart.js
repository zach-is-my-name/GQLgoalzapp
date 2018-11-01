/* eslint-disable */
import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter, Redirect} from 'react-router-dom'
import SuggestStep from './SuggestStep.js'
// import '../../style/SuggestStep.css'

const clonedStepIdQuery = gql `
 query clonedStepIdQuery($id:ID){
   allClonedSteps(filter: {goalDoc: {id: $id}}, orderBy: positionIndex_ASC) {
      id
      positionIndex
      step
      suggestedStep

    }
  }`

const updateOrCreateClonedStep = gql `mutation updateOrCreateClonedStepMutation ($goalDocId: ID, $id: ID!, $positionIndex: Int!, $step: String!, $suggestedStep: Boolean!, $suggesterId: ID!) {
    updateOrCreateClonedStep(create: {goalDocId: $goalDocId,
    positionIndex: $positionIndex, suggestedStep: $suggestedStep,
    step: $step, suggesterId: $suggesterId }, update: {goalDocId: $goalDocId, positionIndex:
    $positionIndex, id: $id, suggesterId: $suggesterId}) {
      step
      id
      suggester{
        userName
      }
      goalDoc {
        id
      }
    }}`

const goalDocByIdQuery = gql `
    query RefetchGoalDocByIdQuery ($goalDocId: ID) {
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

class SuggestStepSmart extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this._submitSuggestedStep = this._submitSuggestedStep.bind(this)
    this._submitSuggestedStepMutation = this._submitSuggestedStepMutation.bind(this)
    // this.submitSubsequent = this.submitSubsequent.bind(this)
    this.state = {
      step: " "
    }
  }

  render() {

    if (this.props.loggedInUser && this.props.loggedInUser !== this.props.targetUser) {
      return (
        <SuggestStep _submitSuggestedStep={this._submitSuggestedStep}
          handleChange={this.handleChange}
          value={this.state.step} />
      )
    } else if (!this.props.loggedInUser) {
      // TODO also check if the cloned steps are owned by the user.  This becomes more clear with 'suggestions by user'
      return null
    }
    else {
      console.log('Not a foreign user!')
      return null
    }
  }
  handleChange(e) {
    this.setState({step: e.target.value});
  }

  async _submitSuggestedStep(event) {
    event.preventDefault()
    // console.log(this._reorderSteps(this.props.stepIdQuery))
    if (this.props.loggedInUser) {
      await this._submitSuggestedStepMutation(this._reorderSteps(this.props.clonedStepIdQuery))
  } else if (!this.props.loggedInUser && this.state.step) {
    //render create user; save step state; when create user resolves send mutation
  }
  }

  _reorderSteps(queryResult) {
    const {loading, error, allClonedSteps} = queryResult
    if (!loading) {
      console.log('query result', allClonedSteps)
      // console.log(allSteps)
      // actions.setStepAndPositionIndex(this.state.step, this.props.index)
      // actions.setClonedStepAndPositionIndex(this.state.step, this.props.index)
      const newStep = {
        step: this.state.step,
        suggestedStep: true,
        id: null,
        positionIndex: null
      }
      const stepIndex = this.props.stepIndex
      const newSteps = allClonedSteps.slice()
      newSteps.splice(stepIndex, 0, newStep )
      return newSteps.map((stepObj, index) => ({
        ...stepObj,
        positionIndex: index
      }))
    }
  }

  _submitSuggestedStepMutation = async (newClonedStepsSortedByPositionIndex) => {
    console.log(newClonedStepsSortedByPositionIndex)
    newClonedStepsSortedByPositionIndex.map(async (stepObj, mapIndex, array) => {
      let id
      if (stepObj.id) {
        id = stepObj.id
      } else {
        id = "x"
      }
      const suggestStepResult = await this.props.updateOrCreateClonedStep({
        variables: {
          goalDocId: this.props.goalDocId,
          id: id,
          positionIndex: stepObj.positionIndex,
          suggestedStep: stepObj.suggestedStep,
          step: stepObj.step,
          suggesterId: this.props.loggedInUser
        }
      })
    })
  }

}

export default compose(
  graphql(clonedStepIdQuery, {
    name:"clonedStepIdQuery",
    options: (ownProps) => ({
      variables: {
        id: ownProps.goalDocId
      },
      fetchPolicy: 'network-only'
    })
  }),
  graphql(updateOrCreateClonedStep, {
  name: 'updateOrCreateClonedStep',
  props: ({updateOrCreateClonedStep}) => ({
    updateOrCreateClonedStep({variables}) {
      return updateOrCreateClonedStep({
        variables: {
          ...variables
        },
        refetchQueries: ['goalDocByIdQuery']
      }).catch((error) => {
        console.error(error)
      })
    }
  })
}))(withRouter(SuggestStepSmart))
