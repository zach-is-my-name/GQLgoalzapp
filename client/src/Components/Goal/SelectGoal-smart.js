/* eslint-disable */
/* This component queries for the goalDocs and renders a select form with each goalDoc,
It dispatches an action to set the current goal id == to selected goal */

import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions'
import {connect} from 'react-redux';
import SelectGoalForm from './Form/SelectGoalForm'

const GoalDocQuery = gql `query allGoalDocsQuery ($targetUserId: ID) {
  allGoalDocs(filter:
    {owners :{id: $targetUserId}}){
    goal
    id
  }
}`

class SelectGoalSmart extends React.Component {
  constructor(props) {
    super(props)
    this.selectGoal = this.selectGoal.bind(this);
    }

  render() {
    const {loading, error, allGoalDocs} = this.props.goalDocQuery
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

  selectGoal(values) {
    event.preventDefault();
    const goalDocId = values.goalSelector

    if (values.goalSelector) {
      this.props.setGoalDocId(goalDocId)
      // this.props.dispatch(actions.setGoalDocID(goalDocID))
    }
  }
}


const ComponentWithData = graphql(GoalDocQuery,
{name: 'goalDocQuery'},{ options: ({targetUserId}) => ({ variables: {targetUserId: targetUserId}}),
})(SelectGoalSmart);

export default ComponentWithData
