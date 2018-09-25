/* eslint-disable */
// //index is passed down as stepIndex because it is restricted in react-sortable

import React, {Component} from 'react';
import {connect} from 'react-redux';
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions.js'
import '../../style/CurrentSteps.css'
import OwnGoalCurrentSteps from './OwnGoalCurrentSteps.js'
import ForeignGoalCurrentSteps from './ForeignGoalCurrentSteps.js'

class CurrentStepsSmart extends Component {

  // componentWillMount() {
  //   if (this.props.loggedInUser !== this.props.targetUser) {
  //     this.props.dispatch(actions.cloneCurrentSteps(this.props.currentGoalSteps))
  //     console.log('this.props.currentGoalSteps',this.props.currentGoalSteps)
  //     console.log('cloneCurrentSteps called from CurrentSteps.js ')
  //   }
  //   }

  render() {

    let currentSteps

    if (this.props.loggedInUser !== this.props.targetUser) {
      currentSteps = <ForeignGoalCurrentSteps/>
    } else {
      currentSteps = <OwnGoalCurrentSteps randomColorStep={this.props.randomColorStep} currentGoalStepsClone={this.props.currentGoalStepsClone} goalDocId={this.props.goalDocId}/>
    }
    return (
      <div className="steps-container">
        <p className="currentsteps-label">
          Steps:
        </p>
        {currentSteps}
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {currentGoalSteps: state.goals.currentGoalSteps, loggedInUser: state.goals.loggedInUserID, targetUser: state.goals.targetUserID, currentGoalStepsClone: state.goals.currentGoalStepsClone, goalDocId: state.goals.currentGoalID}
}


export default connect(mapStateToProps)(CurrentStepsSmart);
