/* eslint-disable */
/* Read from state the current goal ID, then query for the goal name
with that ID, render the goal name with that query and set the current goal with an action */

/* Expect problems reading the current goal, when the page first loads and there is no current
goal selected */

/* CURRENT_GOAL */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Query, graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions'
import '../../style/CurrentGoal.css'

const fetchGoalDocByID = gql `
query GoalDocByIdQuery ($varID: ID) {
  GoalDoc(id: $varID) {
   goal
   id
   steps(orderBy:positionIndex_ASC) {
     step
     positionIndex
     suggestedStep
     id
     originalId
   }
   clonedSteps(orderBy:positionIndex_ASC) {
     step
     positionIndex
     id
     suggestedStep
     originalId
     suggester {
       userName
     }
   }
  }
}`;

class CurrentGoal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    if (this.props.goalDocById) {
      const {
        goalDocById: {
          loading,
          error,
          GoalDoc
        }
      } = this.props;
      if (!loading) {
        error
          ? console.log(error)
          : null
        return (<div className="currentgoal-container">
          <p className="currentgoal-label">Current Goal:
          </p>
          <p className="currentgoal">
            {
              !this.props.id
                ? null
                : GoalDoc.goal
            }</p>
        </div>)
      }
    }
    return null;
  }

  /* Check if Query was sent and Data Received */
  componentWillReceiveProps(nextProps) {
    if (nextProps.goalDocById && !nextProps.goalDocById.loading && nextProps.goalDocById.GoalDoc) {
      if (this.props.goalDocById.GoalDoc !== nextProps.goalDocById.GoalDoc) {
        this.props.dispatch(actions.setGoalDoc(nextProps.goalDocById.GoalDoc))

        if (nextProps.goalDocById.GoalDoc.clonedSteps.length === 0) {
          this.props.dispatch(actions.cloneCurrentSteps(nextProps.goalDocById.GoalDoc.steps))
        } else if (this.props.loggedInUser === this.props.targetUser && nextProps.goalDocById.GoalDoc.clonedSteps.length >= 1) {
          this.props.dispatch(actions.setClonedStepsFromServer(nextProps.goalDocById.GoalDoc.clonedSteps))
        }
      }
    }
  }
}

  /* REDUX CONNECT */
  const mapStateToProps = (state, props) => {
    return {
      currentGoal: state.goals.currentGoal,
      currentGoalID: state.goals.currentGoalID,
      currentGoalSteps: state.goals.currentGoalSteps,
      loggedInUser: state.goals.loggedInUserID,
      targetUser: state.goals.targetUserID,
      currentGoalStepsClone: state.goals.currentGoalStepsClone
    }
  }

  const CurrentGoalWithState = connect(mapStateToProps)(CurrentGoal);

  /* GRAPHQL QUERY */

  const CurrentGoalWithData = graphql(fetchGoalDocByID, {
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
