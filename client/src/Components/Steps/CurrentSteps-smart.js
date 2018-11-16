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
   clonedSteps(orderBy:positionIndex_ASC)
    {
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
   }  }
}`;



const  suggesterClonedSteps = gql `
 query suggesterClonedSteps($goalDocId:ID){
   allClonedSteps(filter: {goalDoc: {id: $goalDocId}}, orderBy: positionIndex_ASC) {
      id
      positionIndex
      step
      suggestedStep

    }
  }`

class CurrentStepsSmart extends Component {
  constructor(props) {
    super(props)

  }

  render() {

const {loggedInUserId, targetUser} = this.props
let suggesterClonedSteps
let clonedSteps
let steps
if (this.props.goalDocById && this.props.goalDocById.loading || this.props.suggesterClonedSteps && this.props.suggesterClonedSteps.loading) {
    return <div>Loading...</div>
  }

if (this.props.suggesterClonedSteps && !this.props.suggesterClonedSteps.loading) {
    // filter out clonedStep (suggested === true && suggester !== selectedSuggesterId)
    console.log(this.props.suggesterClonedSteps)
    suggesterClonedSteps = this.props.suggesterClonedSteps.allClonedSteps.filter(
      stepObj => { return  !stepObj.suggestedStep && stepObj.suggester &&
        stepObj.suggester.id === this.props.selectedSuggesterId ||
        !stepObj.suggestedStep && !stepObj.suggester ||
        stepObj.suggestedStep && stepObj.suggester && stepObj.suggester.id === this.props.selectedSuggesterId})
      } else if (this.props.suggesterClonedSteps &&
          this.props.suggesterClonedSteps.loading){
            suggesterClonedSteps = []
        }
if (this.props.goalDocById && !this.props.goalDocById.loading && this.props.goalDocById.GoalDoc) {
  clonedSteps = this.props.goalDocById.GoalDoc.clonedSteps
  steps = this.props.goalDocById.GoalDoc.steps
} else {
  clonedSteps = []
  steps = []
}



    return (
      <div className="current-steps-smart-container">
        {
          loggedInUserId !== targetUser ?

            <ForeignGoalCurrentSteps
              goalDocId={this.props.goalDocId}
              targetUser={targetUser}
              loggedInUserId={loggedInUserId}
              steps={this.props.goalDocById.GoalDoc.steps || []}
              clonedSteps={this.props.goalDocById.GoalDoc.clonedSteps}
              selectedSuggesterId={this.props.selectedSuggesterId}
              suggestersIndex={this.props.suggestersIndex}
            />
          : <OwnGoalCurrentSteps
            randomColorStep={this.props.randomColorStep}
            clonedSteps={clonedSteps}
            steps={steps}
            goalDocId={this.props.goalDocId}
            targetUser={targetUser}
            loggedInUserId={this.props.loggedInUserId}
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
graphql(suggesterClonedSteps, {
  name: 'suggesterClonedSteps',
  options: (ownProps) => {
    return({ variables: {goalDocId: ownProps.goalDocId}})
  },
  skip: ownProps => ownProps.selectedSuggesterId === ownProps.loggedInUserId
}

)

)(CurrentStepsSmart)

export default WithData
// export default connect(mapStateToProps)(CurrentStepsSmart);
