/* eslint-disable */
import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import EditStep from './EditStep.js'

const updateClonedStepMutation1 = gql `
  mutation EditClonedStepMutation( $id: ID!, $step: String, $suggesterId: String) {
    updateClonedStep(id: $id, step: $step, suggestedStep: true, suggestEdit: true, suggesterId: $suggesterId) {
      id
      step
      suggestedStep
      suggestEdit
      suggester {
        id
      }
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
const goalDocByIdQuery1 = gql `
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
           id
           userName
         }
       }
      }
    }`;

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
        unrenderEditFunction={this.props.unrenderSuggestEditStepFunction}
      />
        )
  }

async _submitEditedStep(e) {
    console.log('submitEdited clicked')
    e.preventDefault()
    if (this.props.loggedInUserId && this.props.loggedInUserId !== this.props.targetUser) {
      await this.props.updateClonedStep({variables: {
        id: this.props.stepObj.id,
        step: this.state.editedStep,
        suggesterId: this.props.loggedInUserId,
        suggestedStep: true,
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
