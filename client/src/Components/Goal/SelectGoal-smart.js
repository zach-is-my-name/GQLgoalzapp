/* eslint-disable */
/* This component queries for the goalDocs and renders a select form with each goalDoc,
It dispatches an action to set the current goal id == to selected goal */

import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions'
import {connect} from 'react-redux';
import SelectGoalForm from './Form/SelectGoalForm'

const GoalDocQuery = gql `query allGoalDocsQuery ($userId: ID) {
  allGoalDocs(filter:
    {owners :{id: $userId}}){
    goal
    id
  }
}`;

class SelectGoalSmart extends React.Component {
  constructor(props) {
    super(props)
    this.selectGoal = this.selectGoal.bind(this);
    this.state = {
      goalDocId: ''
    }
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
      this.setState({goalDocId})
      // this.props.dispatch(actions.setGoalDocID(goalDocID))
    }
  }
}

const mapStateToProps = (state, props) => {
  // console.log(state)
  return {currentGoal: state.goals.currentGoal,  loggedIn: state.goals.loggedIn, userid: state.goals.userid, targetUserID: state.goals.targetUserID,}
}

const SelectGoalWithState = connect(mapStateToProps)(SelectGoalSmart)


const ComponentWithData = graphql(GoalDocQuery,
{name: 'goalDocQuery'},{ options: ({userId}) => ({ variables: {userid: userId}}),
})(SelectGoalWithState);

export default connect(mapStateToProps)(ComponentWithData)
