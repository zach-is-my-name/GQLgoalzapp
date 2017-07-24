/* eslint-disable */
/* This component queries for the goalDocs and renders a select form with each goalDoc,
It dispatches an action to set the current goal id == to selected goal */

import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions'
import {connect} from 'react-redux';

import SelectGoalForm from './Form/SelectGoalForm'

/*CLASS DECLARATION */
class SelectGoal extends React.Component {
  constructor(props) {
    super(props)
    this.selectGoal = this.selectGoal.bind(this);

  }

  /* EVENT HANDLER */
  selectGoal(values) {
    event.preventDefault();
    const goalDocID = values.goalSelector
    /*ACTION DISPATCH */
    if (values.goalSelector) {
    this.props.dispatch(actions.setGoalDocID(goalDocID))
    }
  }

  /*RENDER METHOD */
  render() {
    const { data: {loading,error,allGoalDocs} } = this.props
    if (loading) {
      return <div>loading...</div>;
    } else if (error) {
      console.error(error)
      return <p>Error!</p>
    } else {
    return (
      <div>
        <SelectGoalForm goalDocs={allGoalDocs} onChange={this.selectGoal}/>
      </div>
      )
    }
  }
}

/*REDUX */
const mapStateToProps = (state, props) => {
  // console.log(state)
  return {currentGoal: state.goals.currentGoal,  loggedIn: state.goals.loggedIn, userid: state.goals.userid, targetUser: state.goals.targetUser,}
}

const SelectGoalWithState = connect(mapStateToProps)(SelectGoal)

/*GRAPHQL QUERY */
const GoalDocQuery = gql `query ($userid: ID) {
  allGoalDocs(filter:
    {owners :{id: $userid}})
  {
    goal
    id
  }
}`;

const ComponentWithData = graphql(GoalDocQuery,
{ options: ({targetUser}) => ({ variables: {userid:targetUser}}),
})(SelectGoalWithState);



export default connect(mapStateToProps)(ComponentWithData)
