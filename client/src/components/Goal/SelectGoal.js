/* eslint-disable */
/* This component queries for the goalDocs and renders a select form with each goalDoc,
It dispatches an action to set the current goal id == to selected goal */

import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions'
import {connect} from 'react-redux';

import SelectGoalForm from './Form/SelectGoalForm'
import CurrentGoal from './CurrentGoal'

/*CLASS DECLARATION */
class SelectGoal extends React.Component {
  constructor(props) {
    super(props)
    this.selectGoal = this.selectGoal.bind(this);
    // this.idProps = this.idProps.bind(this)
  }

  /* EVENT HANDLER */
  selectGoal(values) {
    event.preventDefault();
    const goalDocID = values.goalSelector
    /*ACTION DISPATCH */
    this.props.dispatch(actions.setGoalDocID(goalDocID))
  }

  /*RENDER METHOD */
  render() {
    const { data: {loading,error,allGoalDocs} } = this.props;
    if (loading) {
      return <div>loading...</div>;
    } else if (error) {
      return <p>Error!</p>
    } else {
    return (
      <div>
        <SelectGoalForm goalDocs={this.props.data.allGoalDocs} onChange={this.selectGoal}/>
        <CurrentGoal id={this.props.currentGoalID}/>
      </div>
      )
    }
  }
}

/*GRAPHQL QUERY */

// const userQuery = gql `
//           query userQuery {
//             user {
//               id
//             }
//           }
//         `

const GoalQuery = gql `query {
      allGoalDocs(orderBy:updatedAt_DESC){
        goal
        id
        }
      }`;


// const ComponentWithUserQuery =  graphql(userQuery, {skip: (props) => !props.loggedIn,
//   options: {fetchPolicy: 'network-only'}})(SelectGoal)

const ComponentWithData = graphql(GoalQuery,
{skip:(props) => !props.loggedIn})(SelectGoal);



/*REDUX CONNECT */
const mapStateToProps = (state, props) => {
  // console.log(state)
  return {currentGoal: state.goals.currentGoal, currentGoalID: state.goals.currentGoalID, loggedIn: state.goals.loggedIn}
}

export default connect(mapStateToProps)(ComponentWithData)
