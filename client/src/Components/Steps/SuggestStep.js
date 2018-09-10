/* eslint-disable */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {withRouter, Redirect} from 'react-router-dom'
import * as actions from '../../Actions/actions'
// import '../../style/SuggestStep.css'

const updateOrCreateClonedStep = gql `mutation updateOrCreateClonedStepMutation ($goalDocId: ID, $id: ID!, $positionIndex: Int!, $step: String!, $suggestedStep: Boolean!, $suggesterId: ID!) {
    updateOrCreateClonedStep(create: {goalDocId: $goalDocId,
    positionIndex: $positionIndex, suggestedStep: $suggestedStep,
    step: $step, suggesterId: $suggesterId }, update: {goalDocId: $goalDocId, positionIndex:
    $positionIndex, id: $id, suggesterId: $suggesterId}) {
      step
      id
      goalDoc {
        id
      }
    }}`

class SuggestStep extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this._submitSuggestedStep = this._submitSuggestedStep.bind(this)
    // this.submitSubsequent = this.submitSubsequent.bind(this)
    this.state = {
      step: " "
    }
  }

  _submitSuggestedStep(event) {
    event.preventDefault()
    actions.setClonedStepAndPositionIndex(this.state.step, this.props.index)
    // this.props.dispatch(actions.setSuggestedStep(this.state.step, this.props.index))
    // this.props.dispatch(actions.setClonedStepPositionIndex())
  }

  handleChange(e) {
    this.setState({step: e.target.value});
  }

  componentWillReceiveProps(nextProps) {
    const suggesterId = nextProps.loggedInUserID

    if (nextProps.currentGoalStepsClone.length > this.props.currentGoalStepsClone.length) {
      nextProps.currentGoalStepsClone.map((stepObj, mapIndex, array) => {

        let id
        if (stepObj.id) {
          id = stepObj.id
        } else {
          id = "x"
        }
        return this.props.updateOrCreateClonedStep({
          variables: {
            goalDocId: this.props.goalDocId,
            id: id,
            positionIndex: stepObj.positionIndex,
            suggestedStep: stepObj.suggestedStep,
            step: stepObj.step,
            suggesterId: this.props.loggedInUserID
          }
        }).then(({data}) => {
          if (!stepObj.id) {
            return this.props.dispatch(actions.setClonedStepIdFromServer(mapIndex, data.updateOrCreateClonedStep.id))
          }
        })
      })
    }
  }

  render() {

    if (this.props.loggedInUserID !== this.props.targetUserID) {
      return (<div className="suggest-step-input">
        <form onSubmit={this._submitSuggestedStep}>
          <input type="text" onChange={this.handleChange} placeholder="" value={this.state.step}/>
          <input className="suggest-step-button" type="submit" value="Suggest Step"/>
        </form>
      </div>)
    } else {
      console.log('Not a foreign user!')
      return null
    }
  }

}

const mapStateToProps = (state, props) => {
  return {
    loggedInUserID: state.goals.loggedInUserID,
    targetUserID: state.goals.targetUserID,
    currentGoalID: state.goals.currentGoalID,
    currentGoalStepsClone: state.goals.currentGoalStepsClone,
    goalDocId: state.goals.currentGoalID,
    resolveAcceptStep: state.goals.resolveAcceptStep

  }
}

const SuggestStepWithApollo = compose(graphql(updateOrCreateClonedStep, {
  name: 'updateOrCreateClonedStep',
  props: ({updateOrCreateClonedStep}) => ({
    updateOrCreateClonedStep({variables}) {
      return updateOrCreateClonedStep({
        variables: {
          ...variables
        }
      }).catch((error) => {
        console.error(error)
      })
    }
  })
}))(withRouter(SuggestStep))

export default connect(mapStateToProps)(SuggestStepWithApollo);
