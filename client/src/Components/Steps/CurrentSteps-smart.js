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


// arr.map(obj => obj.suggester.userName).filter((item, pos, self) => self.indexOf(item) == pos)

// arr.filter((obj, index, self) =>
//   self.findIndex((findObj) => {return (obj.userName === findObj.userName && obj.id === findObj.id)}) === index)
//
// const clonedStepsArr = result.data.GoalDoc.clonedSteps
//
// const arrGoalDocSuggesters =  clonedStepsArr.map(obj => ({userName: obj.suggester.userName, id: obj.suggester.id})).filter((obj, index, self) =>
//   self.findIndex((findObj) => {return (obj.userName === findObj.userName && obj.id === findObj.id)}) === index)

const goalDocByIdQuery = gql `
query goalDocByIdQuery ($goalDocId: ID, $suggesterId: ID) {
  GoalDoc(id: $goalDocId) {
   goal
   id
   steps(orderBy:positionIndex_ASC) {
     step
     positionIndex
     suggestedStep
     id
   }
   clonedSteps(orderBy:positionIndex_ASC, filter: {suggester: {id: $suggesterId}}) {
     step
     positionIndex
     id
     suggestedStep
     suggestRemove
     stepsId
     suggester {
       userName
       id
     }
   }
  }
}`;

const  allClonedStepsQuery = gql `
 query allClonedStepsQuery($goalDocId:ID){
   allClonedSteps(filter: {goalDoc: {id: $goalDocId}}, orderBy: positionIndex_ASC) {
      id
      positionIndex
      step
      suggestedStep

    }
  }`

class CurrentStepsSmart extends Component {

  render() {

const {loading, error, GoalDoc} = this.props.goalDocById
const {loggedInUserId, targetUser} = this.props
let currentSteps

if (this.props.goalDocById.loading || this.props.allClonedSteps && this.props.allClonedSteps.loading) {
    return <div>Loading...</div>
  }
    return (
      <div className="steps-container">
        {
          loggedInUserId !== targetUser ?

            <ForeignGoalCurrentSteps
              goalDocId={this.props.goalDocId}
              targetUser={targetUser}
              loggedInUser={loggedInUser}
              steps={GoalDoc.steps}
              clonedSteps={GoalDoc.clonedSteps}
              selfState={this.props.selfState}
            />
          : <OwnGoalCurrentSteps
            randomColorStep={this.props.randomColorStep}
            clonedSteps={this.props.allClonedSteps ? this.props.allClonedSteps.allClonedSteps : this.props.goalDocById.GoalDoc.clonedSteps}
            steps={GoalDoc.steps}
            goalDocId={this.props.goalDocId}
            targetUser={targetUser}
            loggedInUserId={this.props.loggedInUserId}
            selfState={this.props.selfState}
            selectedSuggesterId={this.props.selectedSuggesterId}
            suggestersIndex={this.props.suggestersIndex}
            />
        }
      </div>
          )
  }

}

// const mapStateToProps = (state, props) => {
//   return {currentGoalSteps: state.goals.currentGoalSteps, loggedInUser: state.goals.loggedInUserID, targetUser: state.goals.targetUserID, currentGoalClonedSteps: state.goals.currentGoalClonedSteps, goalDocId: state.goals.currentGoalID}
// }

const WithData = compose(graphql(goalDocByIdQuery,
  {name: 'goalDocById',
  options: (ownProps) => {
    return  ({  variables: {goalDocId: ownProps.goalDocId, suggesterId: ownProps.selectedSuggesterId}
})}}
),
graphql(allClonedStepsQuery, {name: 'allClonedSteps',
skip: ownProps => ownProps.selectedSuggesterId !== ownProps.loggedInUserId})
)(CurrentStepsSmart)

export default WithData
// export default connect(mapStateToProps)(CurrentStepsSmart);
