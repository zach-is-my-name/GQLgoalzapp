/* eslint-disable */
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


  /* CLASS DECLARATION */
class CurrentGoal extends Component {
    constructor(props) {
        super(props)
    // this.setGoalDoc = this.setGoalDoc.bind(this);
    }



/* RENDER METHOD */
    render (){
      if (this.props.data){
        const { data: { loading, error, goalDocByID } } = this.props;
        if (!loading){
          return(
            <p>Current Goal: { !this.props.id  ?
            null : goalDocByID.goal  }</p>

)}
    }
    return null;
      }
    componentWillReceiveProps(nextProps){
        if(nextProps.data && nextProps.data.loading == false) {
        // console.log('NEXTPROPS',nextProps.data.goalDocByID)
          this.props.dispatch(actions.setGoalDoc(nextProps.data.goalDocByID))
}}
}

      // componentDidUpdate(prevProps, prevState){
      // console.log('PREVIOUS PROPS', prevProps);
      // console.log('PREVIOUS STATES', prevState)
          // this.props.dispatch(actions.setGoalDoc(goalDocByID))
    // }

    //could add a loading spinner here
    //Nit-pick issue: Current behavior is the entire 'Current Goal' text re-renders when a goal
     // is selected.  Before, only the selected goal rendered.  How to keep the latter...?

/* REDUX CONNECT */
const mapStateToProps = (state, props) => {
    return {
        currentGoal: state.goals.currentGoal,
        currentGoalID: state.goals.currentGoalID,
        currentGoalSteps: state.goals.currentGoalSteps
    }
}

const CurrentGoalWithState = connect(mapStateToProps)(CurrentGoal);

/* GRAPHQL QUERY */
const FetchGoalDocByID = gql `
query root($varID:String) {
  goalDocByID(id:$varID) {
    goal
    steps
    id
  }
}`;

const CurrentGoalWithData = graphql(FetchGoalDocByID, {
 skip: (props) => !props.id,
 options: ({id}) =>( {variables: {varID: id} })
})(CurrentGoalWithState);



export default CurrentGoalWithData
