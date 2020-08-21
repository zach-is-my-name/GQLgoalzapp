/* eslint-disable */
import React, {Component} from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import EditStep from './EditStep.js'

const updateClonedStep= gql `
mutation updateClonedStep( $id: ID!, $step: String, $suggesterId: ID ) {
   clonedStepUpdate(data: {
      id: $id, step: $step, suggestEdit: true,
    suggestedStep: true,
    suggester:{ connect: {id: $suggesterId} }
  })
   {
    id
    positionIndex
    stepsId
    suggestedStep
    step
  }
}`
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

class SuggestEditStepSmart  extends Component {
  constructor(props) {
    super(props)
    this._submitEditedStep = this._submitEditedStep.bind(this)
    this._handleChange = this._handleChange.bind(this)
    this.state = { editedStep: props.stepObj.step }
  }

  _handleChange(e) {
      this.setState({editedStep: e.target.value})
  }

  async _submitEditedStep(e) {
      console.log('submitEdited clicked')
      e.preventDefault()
      if (this.props.loggedInUserId && this.props.loggedInUserId !== this.props.targetUserId) {
        await this.props.updateClonedStep({variables: {
          id: this.props.stepObj.id,
          step: this.state.editedStep,
          suggesterId: this.props.loggedInUserId,
        }})
        this.props.unrenderSuggestEditStepFunction()
      }
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
}

const comp = compose(graphql(updateClonedStep, {
  name: 'updateClonedStep',
  props: ({updateClonedStep}) => ({
    updateClonedStep({variables}) {
      return updateClonedStep({
        variables: {
          ...variables
        },
        refetchQueries: ['goalDocByIdQuery'],
      }).catch((error) => {
        console.log(error)
      })
    }
  })
}))(SuggestEditStepSmart)


export default comp
