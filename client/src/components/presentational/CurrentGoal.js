/* Read from state the current goal ID, then query for the goal name
with that ID, render the goal name with that query and set the current goal with an action */

/*Expect problems reading the current goal, when the page first loads and there is no current
goal selected */

/* Find out how to conditionally query, based upon if there is a currentGoalID in state
--Answer: should be with skip(), why though is it not working? See my Stackoverflow question
*/

import React,{Component} from 'react';
import {connect} from 'react-redux';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions'

class CurrentGoal extends Component {
    constructor(props) {
        super(props)
    }


    render (){

      // console.log(this.props.data)
      if (this.props.data){
      const { data: { loading, error, goalDocsByID } } = this.props;

      if (!loading){

      return(
        <p>Current Goal: { !this.props.id  ?
        null : goalDocsByID.goal  }</p>

)}
    }
    /*Nit-pick issue: Current behavior is the entire 'Current Goal' text re-renders when a goal
      is selected.  Before, only the selected goal rendered.  How to keep the latter...?
     */
    //could add a loading spinner here
    return null;
      }
  }

const mapStateToProps = (state, props) => {
    return {
        currentGoal: state.goals.currentGoal,
        currentGoalID: state.goals.currentGoalID,
        currentGoalSteps: state.goals.currentGoalSteps
    }
}

const CurrentGoalWithState = connect(mapStateToProps)(CurrentGoal);

const FetchGoalDocByID = gql `
query root($varID:String) {
  goalDocsByID(id:$varID) {
    goal
  }
}`;


const CurrentGoalWithData = graphql(FetchGoalDocByID, {
 skip: (props) => !props.id,
 options: ({id}) =>( {variables: {varID: id} })
})(CurrentGoalWithState);

// export default CurrentGoalWithState
export default CurrentGoalWithData
