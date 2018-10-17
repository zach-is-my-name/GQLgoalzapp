/* eslint-disable */
// //index is passed down as stepIndex because it is restricted in react-sortable

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphql, compose} from 'react-apollo'
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions.js'
import '../../style/CurrentSteps.css'
import OwnGoalCurrentSteps from './OwnGoalCurrentSteps.js'
import ForeignGoalCurrentSteps from './ForeignGoalCurrentSteps.js'

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
     suggestRemove
     stepsId
     suggester {
       userName
     }
   }
  }
}`;


class CurrentStepsSmart extends Component {

  render() {

const {loading, error, GoalDoc} = this.props.goalDocById
const {loggedInUser, targetUser} = this.props
let currentSteps

if (loading) {
    return <div>Loading...</div>
  }
    return (
      <div className="steps-container">
        <p className="currentsteps-label">
          Steps:
        </p>
        {loggedInUser !== targetUser ?
          <ForeignGoalCurrentSteps
            goalDocId={this.props.goalDocId}
            targetUser={targetUser}
            loggedInUser={loggedInUser}
            steps={GoalDoc.steps}
            clonedSteps={GoalDoc.clonedSteps}
          />
        : <OwnGoalCurrentSteps
          randomColorStep={this.props.randomColorStep}
          clonedSteps={GoalDoc.clonedSteps}
          steps={GoalDoc.steps}
          goalDocId={this.props.goalDocId}
          targetUser={targetUser}
          loggedInUser={loggedInUser}/>
        }
      </div>
          )
  }

}

// const mapStateToProps = (state, props) => {
//   return {currentGoalSteps: state.goals.currentGoalSteps, loggedInUser: state.goals.loggedInUserID, targetUser: state.goals.targetUserID, currentGoalStepsClone: state.goals.currentGoalStepsClone, goalDocId: state.goals.currentGoalID}
// }

const WithData = compose(graphql(goalDocByIdQuery,
  {name: 'goalDocById',
  options: (ownProps) => {
    return  ({  variables: {goalDocId: ownProps.goalDocId}
})}}
))(CurrentStepsSmart)

export default WithData
// export default connect(mapStateToProps)(CurrentStepsSmart);
