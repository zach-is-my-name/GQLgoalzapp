/* eslint-disable */
/* Read from state the current goal ID, then query for the goal name
with that ID, render the goal name with that query and set the current goal with an action */

/* Expect problems reading the current goal, when the page first loads and there is no current
goal selected */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {compose} from 'react-apollo'
import {Query, graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions'
import CurrentGoal from './CurrentGoal'
import '../../style/CurrentGoal.css'

const fetchGoalDocByID = gql `
query GoalDocByIdQuery ($goalDocId: ID) {
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
}`;

class CurrentGoalSmart extends Component {
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
          :null
      }
    }
    return null;
  }

  /* Check if Query was sent and Data Received */
  componentWillReceiveProps(nextProps) {
    if (nextProps.goalDocById && !nextProps.goalDocById.loading && nextProps.goalDocById.GoalDoc) {
      if (this.props.goalDocById.GoalDoc !== nextProps.goalDocById.GoalDoc) {
        this.props.dispatch(actions.setGoalDoc(nextProps.goalDocById.GoalDoc))

        if (nextProps.goalDocById.GoalDoc.clonedSteps.items.length === 0) {
          this.props.dispatch(actions.cloneCurrentSteps(nextProps.goalDocById.GoalDoc.items.steps))
        } else if (this.props.loggedInUser === this.props.targetUserId && nextProps.goalDocById.GoalDoc.clonedSteps.items.length >= 1) {
          this.props.dispatch(actions.setClonedStepsFromServer(nextProps.goalDocById.GoalDoc.clonedSteps.items))
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
      targetUserId: state.goals.targetUserID,
      currentGoalClonedSteps: state.goals.currentGoalClonedSteps
    }
  }

  const WithState = connect(mapStateToProps);

  /* GRAPHQL QUERY */

  const CurrentGoalWithStateAndData = compose(graphql(fetchGoalDocByID, {
    name: 'goalDocById',
    skip: (props) => !props.id,
    options: ({id}) => ({
      fetchPolicy: 'network-only',
      variables: {
        goalDocId: id
      }
    })
  }), WithState)(CurrentGoal)

  export default CurrentGoalWithStateAndData
