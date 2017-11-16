/* eslint-disable */
/* Read from state the current goal ID, then query for the goal name
with that ID, render the goal name with that query and set the current goal with an action */

/*Expect problems reading the current goal, when the page first loads and there is no current
goal selected */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions'
import '../../style/CurrentGoal.css'
/* CLASS DECLARATION */

class CurrentGoal extends Component {
  constructor(props) {
    super(props)
  }

  /* RENDER METHOD */
  render() {
    if (this.props.goalDocById) {
      const {goalDocById: {loading,error,GoalDoc}} = this.props;
      if (!loading) {
        error ? console.log(error) : null
        return (
          <div className="currentgoal-container">
            <p className="currentgoal-label">Current Goal: </p>
            <p className="currentgoal"> {!this.props.id
              ? null
            : GoalDoc.goal}</p>
          </div>
        )
      }
    }
    return null;
  }


  /*Check if Query was sent and Data Received */
  componentWillReceiveProps(nextProps) {
    if (nextProps.goalDocById && nextProps.goalDocById.loading === false && nextProps.goalDocById.GoalDoc) {
    if (this.props.goalDocById.GoalDoc !== nextProps.goalDocById.GoalDoc){
        // console.log(nextProps.goalDocById.GoalDoc)
        this.props.dispatch(actions.setGoalDoc(nextProps.goalDocById.GoalDoc))
        console.log('goalDoc', nextProps.goalDocById.GoalDoc)
      if (nextProps.goalDocById.GoalDoc.clonedSteps.length === 0){
        // console.log('nextProps.goalDocById.GoalDoc', nextProps.goalDocById.GoalDoc)
        // console.log('nextProps.goalDocById.GoalDoc.steps', nextProps.goalDocById.GoalDoc.steps)
        this.props.dispatch(actions.cloneCurrentSteps(nextProps.goalDocById.GoalDoc.steps))
    } else if (nextProps.goalDocById.GoalDoc.clonedSteps.length >= 1) {
          this.props.dispatch(actions.setClonedSteps(nextProps.goalDocById.GoalDoc.clonedSteps))
      }
      if (this.props.loggedInUser !== this.props.targetUser) {
          console.log('currentGoalSteps', nextProps.goalDocById.GoalDoc.steps)
          if(nextProps.goalDocById.GoalDoc.steps.length > this.props.currentGoalSteps.length) {
            this.props.dispatch(actions.cloneCurrentSteps(nextProps.goalDocById.GoalDoc.steps))
          }
          // else {
          // this.props.dispatch(actions.cloneCurrentSteps(nextProps.goalDocById.GoalDoc.steps))
          // console.log('cloneCurrentSteps called from CurrentGoal.js')
      // }
    }
  }
    }
  }
}


/* REDUX CONNECT */
const mapStateToProps = (state, props) => {
  return {currentGoal: state.goals.currentGoal, currentGoalID: state.goals.currentGoalID, currentGoalSteps: state.goals.currentGoalSteps,  loggedInUser: state.goals.loggedInUserID, targetUser: state.goals.targetUserID,
  currentGoalStepsClone: state.goals.currentGoalStepsClone}
}

const CurrentGoalWithState = connect(mapStateToProps)(CurrentGoal);

/* GRAPHQL QUERY */
const FetchGoalDocByID = gql `
query ($varID: ID) {
  GoalDoc(id: $varID) {
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
     suggester {
       userName
     }
   }
  }
}`;

const CurrentGoalWithData = graphql(FetchGoalDocByID, {
  name: 'goalDocById',
  skip: (props) => !props.id,
  options: ({id}) => ({
    fetchPolicy: 'network-only',
    variables: {
      varID: id
    }
  })
})(CurrentGoalWithState);

export default CurrentGoalWithData
