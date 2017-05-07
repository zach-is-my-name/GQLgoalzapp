import React,{Component} from 'react';
import {connect} from 'react-redux';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import * as actions from '../../Actions/actions'

class CurrentGoal extends Component {
    render (){
    // console.log(this.props.currentGoal);
    return <p>Current Goal: {this.props.currentGoal}</p>
}
}

const mapStateToProps = (state, props) => {
    return {
        currentGoal: state.goals.currentGoal,
        currentGoalID: state.goals.currentGoalID
    }
}

// const GoalAndSteps = gql `
//   query `


export default connect(mapStateToProps)(CurrentGoal);
