/* eslint-disable */
import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import EditStep from './EditStep.js'

const updateClonedStepMutation = gql `
  mutation EditClonedStepMutation( $id: ID!, $step: String) {
    updateClonedStep(id: $id, step: $step, suggestedStep: true, suggestEdit: true ) {
      id
      step
      suggestedStep
      suggestEdit
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
class SuggestEditStep extends Component {
  constructor(props) {
    super(props)
    this._submitEditedStep = this._submitEditedStep.bind(this)
    this._handleChange = this._handleChange.bind(this)
    this.state = {
       editedStep: props.stepObj.step,
     }
  }

  _handleChange(e) {
      this.setState({editedStep: e.target.value})
  }

  render() {
    return (
      <EditStep
        _submitEditedStep={this._submitEditedStep}
        handleChange={this._handleChange}
        value={this.state.editedStep}
        unrenderEditFunction={this.props.unrenderEditFunction}
      />
        )
  }

async _submitEditedStep(e) {
    e.preventDefault()
    if (this.props.loggedInUser && this.props.loggedInUser !== this.props.targetUser) {
      await this.props.updateClonedStep({variables: {
        id: this.props.stepObj.id,
        step: this.state.editedStep
      }})
      this.props.unrenderSuggestEditStepFunction()
    } else if (!this.props.loggedInUser) {
      // TODO prompt login or create user; if user owns clonedSteps, resolve action
    }

}
}


const WithData = graphql(updateClonedStepMutation, {
  props: ({mutate}) => ({
    updateClonedStep({variables}) {
      return mutate({
        variables: {
          ...variables
        },
        refetchQueries: ['goalDocByIdQuery'],
      }).catch((error) => {
        console.error(error)
      })
    }
  })
})(SuggestEditStep)

export default (WithData)
