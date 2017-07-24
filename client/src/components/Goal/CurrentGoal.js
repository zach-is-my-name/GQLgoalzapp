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
    if (this.props.data) {
      const {data: {loading,error,GoalDoc}} = this.props;
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
    if (nextProps.data && nextProps.data.loading == false && nextProps.data.GoalDoc) {
    if (this.props.data.GoalDoc !=nextProps.data.GoalDoc){
      /* ACTION DISPATCH */
      this.props.dispatch(actions.setGoalDoc(nextProps.data.GoalDoc))
    }
  }}
}


/* REDUX CONNECT */
const mapStateToProps = (state, props) => {
  return {currentGoal: state.goals.currentGoal, currentGoalID: state.goals.currentGoalID, currentGoalSteps: state.goals.currentGoalSteps}
}

const CurrentGoalWithState = connect(mapStateToProps)(CurrentGoal);

/* GRAPHQL QUERY */
const FetchGoalDocByID = gql `
query ($varID: ID) {
  GoalDoc(id: $varID) {
   goal
   id
   steps(orderBy:createdAt_ASC) {
     step
   }
   suggestedSteps(orderBy:createdAt_ASC){
     suggestedStep
   }
  }
}`;

const CurrentGoalWithData = graphql(FetchGoalDocByID, {
  skip: (props) => !props.id,
  options: ({id}) => ({
    variables: {
      varID: id
    }
  })
})(CurrentGoalWithState);

export default CurrentGoalWithData
