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
    // this._selectGoal = this._selectGoal.bind(this);
    // this._handleChange = this._handleChange.bind(this);
    }

  render() {
    const {loading, error, allGoalDocs} = this.props.goalDocQuery
    if (loading) {
      return null
    } else if (error) {
      console.error(error)
      return <p>Error!</p>
    } else {
    return (
        <SelectGoalForm
          match={this.props.match}
          goalDocs={allGoalDocs}
          value={this.props.value}
          handleChange={this.props.setGoalDocId}
        />
      )
    }
  }

  // _handleChange (event) {
  //  this.setState({goalDocId: })
  // }

  // _selectGoal(values) {
  //   event.preventDefault();
  //   const goalDocId = values.goalSelector
  //
  //   if (values.goalSelector) {
  //     this.props.setGoalDocId(goalDocId)
  //     // this.props.dispatch(actions.setGoalDocID(goalDocID))
  //   }
  // }
}


const ComponentWithData = graphql(GoalDocQuery,
{name: 'goalDocQuery'},{ options: ({targetUserId}) => ({ variables: {targetUserId: targetUserId}}),
})(SelectGoalSmart);

export default ComponentWithData
